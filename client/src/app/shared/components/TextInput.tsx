import { TextField, type TextFieldProps } from "@mui/material";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps
// by saying useForm<ActivitySchema> ({resolver: zodResolver(activityschema)})
// our form learns that the only valid fields in existence are what is in the ActivitySchema (title, desctiption, category...)
// because of <T extends FieldValues> that list of keys is passed to UseControllerProps<T>
// because UseControllerProps<T> knows our schema it FORCES the name prop to match the Zod keys EXACTLY
// Bonus: {control} connects that specific UI field back to my Zod validation
// everything else we are passing to the inputs maps directly to TextFieldProps (multiline, rows...)

export default function TextInput<T extends FieldValues>(props: Props<T>) {

    const { field, fieldState } = useController({ ...props });

    return (
        <TextField
            {...props}
            {...field}
            value={field.value || ''}
            fullWidth
            variant = "outlined"
            error = {!!fieldState.error}
            helperText = {fieldState.error?.message}
        />
    )
}