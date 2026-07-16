import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { LockOpen } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";

export default function RegisterForm() {

    const { registerUser } = useAccount();
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach(err => {
                        if (err.includes('Email')) setError('email', {message: err})
                        else if( err.includes('Password')) setError('password', {message: err})
                    })
                }
            }
        });
    }

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3, width: 'medium', mx: 'auto', borderRadius: 5 }}>
            <Box sx={{ display: 'flex', alginItems: 'center', justifyContent: 'center', gap: 3, color: 'secondary.main' }}>
                <LockOpen />
                <Typography variant="h4" color="secondary">Register</Typography>
            </Box>
            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Display name' control={control} name='displayName' />
            <TextInput label='Password' control={control} type='password' name='password' />
            <Button type='submit' disabled={!isValid || isSubmitting} variant="contained" size="large">
                Register
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
                Already have an account?
                <Typography sx={{ml:2}} component={Link} to='/login' color="primary">
                    Sign in
                </Typography>
            </Typography>
        </Paper>
    )
}