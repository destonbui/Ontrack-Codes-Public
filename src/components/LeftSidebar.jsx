import { Typography, Box, Divider, Drawer, List, Toolbar } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import { Link } from "react-router-dom";
import NavItem from "./NavItem";

function LeftSidebar(props) {
  const { mobileOpen, drawerWidth, handleDrawerToggle } = props;

  const drawer = (
    <>
      <Toolbar sx={{ pl: { xs: 3 } }}>
        <Typography
          variant="h5"
          fontWeight={700}
          component="span"
          color="#1976d2"
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Ontrack
          </Link>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { title: "Dashboard", url: "", icon: DashboardOutlinedIcon },
          { title: "Team", url: "Team", icon: Groups2OutlinedIcon },
          { title: "Projects", url: "Projects", icon: WorkOutlineOutlinedIcon },
        ].map((item, index) => {
          return (
            <NavItem
              toggle={handleDrawerToggle}
              key={index}
              text={item.title}
              url={item.url}
              icon={<item.icon />}
            />
          );
        })}
      </List>
      <Box pl={3} position="absolute" bottom={10}>
        <Typography variant="overline" color="gray">
          Made by Deston Bui
        </Typography>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { sm: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default LeftSidebar;
