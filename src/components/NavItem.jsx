import React from "react";
import { Link, useHref } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function NavItem(props) {
  const { text, url, icon, toggle } = props;
  return (
    <Link
      to={url}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <ListItem disablePadding sx={{ fontWeight: 700 }}>
        <ListItemButton
          onClick={() => {
            toggle();
          }}
          selected={url === useHref().slice(1)}
        >
          <ListItemIcon sx={{ pl: 1 }}>{icon}</ListItemIcon>

          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default NavItem;
