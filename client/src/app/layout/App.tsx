import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/activities/home/HomePage";

/* This is our App component 
  React components are just functions that return JSX
  We have a function that's returning something that looks very much like HTMl, but it's JavaScript code (JSX)
  That's what it will compile to*/

/* Our goal is to fetch data from the API and then store it somewhere and display it
  In order to remember something inside a component, we need to HOOK into react functionality
  And we do that using React hooks */

function App() {

  const location = useLocation();

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container maxWidth='xl' sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  )
}

export default App
