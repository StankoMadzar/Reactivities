import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { flexDirection, justifyContent } from "@mui/system";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <Paper sx={{
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 6
        }}>

        <SearchOff sx = {{fontsize: 100}} color = 'primary'/>
        <Typography gutterBottom variant="h3">
            Oops - we couldn't find what you are looking for
        </Typography>
        <Button fullWidth component = {Link} to='/activities'>
            Return to the activities page
        </Button>
        </Paper>
    )
}