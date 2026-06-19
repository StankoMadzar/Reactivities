import { Box, Container, CssBaseline} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";

/* This is our App component 
  React components are just functions that return JSX
  We have a function that's returning something that looks very much like HTMl, but it's JavaScript code (JSX)
  That's what it will compile to*/

/* Our goal is to fetch data from the API and then store it somewhere and display it
  In order to remember something inside a component, we need to HOOK into react functionality
  And we do that using React hooks */

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities') // fetch returns a javascript promise, which we must unwrap
      .then(response => setActivities(response.data))

    return () => { }
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  return (
    <Box sx={{bgcolor: '#eeeeee'}}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashboard 
        activities={activities} 
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        selectedActivity={selectedActivity}
        />
      </Container>

    </Box>
  )
}

export default App
