import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSideBar from "./ActivityDetailsSidebar";

export default function ActivityDetailsPage() {

    const {id} = useParams();
    const {activity, isLoadingActivity} = useActivities(id);

    if (isLoadingActivity) return <Typography variant="h3" color="primary">Loading...</Typography>

    if (!activity) return <Typography variant="h3" color="primary">Activity not found</Typography>

    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity}/>
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat/>
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSideBar/>
            </Grid>
        </Grid>
  )
}