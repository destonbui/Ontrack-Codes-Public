// Utilities import
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CssBaseline,
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCurrentUser } from "./hooks/useCurrentUser";

// Component imports
import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";

const drawerWidth = 200;

function App() {
  // useState to handle open and close the sidebar on small screen device
  const [mobileOpen, setMobileOpen] = useState(null);

  const theme = useTheme();
  const notMobile = useMediaQuery(theme.breakpoints.up("md"));

  const { user } = useCurrentUser();

  // handle toggle sidebar
  // when user clicked on the hamburger icon on navbar
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (notMobile) {
      setMobileOpen(false);
    }
  }, [mobileOpen, notMobile]);

  return !user ? (
    <Box
      display="flex"
      alignItems={"center"}
      justifyContent="center"
      minHeight={"100vh"}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box className="App">
      <CssBaseline />
      <Box>
        <Navbar handleDrawerToggle={handleDrawerToggle} user={user} />

        <Box sx={{ display: "flex", zIndex: 0, position: "relative" }}>
          <LeftSidebar
            mobileOpen={mobileOpen}
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
