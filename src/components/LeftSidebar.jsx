import {
  Typography,
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Link as MuiLink,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import { Link as RouterLink } from "react-router-dom";
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
          <RouterLink
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Ontrack
          </RouterLink>
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
      <Box
        pl={3}
        position="absolute"
        bottom={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="overline" color="gray">
          &copy; 2023 by{" "}
          <MuiLink
            underline="hover"
            href="https://github.com/destonbui"
            target="_blank"
          >
            Deston Bui
          </MuiLink>
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
