import { Box, Paper, TextField, Typography, Button } from "@mui/material";

export default function ActivityForm() {
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
      </Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField label="Title" />
        <TextField label="Description" multiline rows={3} />
        <TextField label="Category" />
        <TextField label="Date" type="date" />
        <TextField label="City" />
        <TextField label="Venue" />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 3 }}>
          <Button type="button" color="inherit">Cancel</Button>
          <Button type="submit" color="success" variant="contained">Submit</Button>
        </Box>
      </Box>
    </Paper>
  )
}