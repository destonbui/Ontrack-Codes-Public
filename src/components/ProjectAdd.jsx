import { Typography, Grid, Card, Grow, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProjectAdd({ isExpanded, id }) {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = `/Projects/new/1`;
    navigate(path);
  };
  return (
    <Grow
      in={isExpanded}
      style={{ transformOrigin: "0 0 0" }}
      {...(isExpanded ? { timeout: 200 } : {})}
    >
      <Grid
        item
        xs={12}
        sm={11.5 / 2}
        md={11.5 / 2}
        lg={11.5 / 3}
        xl={11.5 / 4}
        display="flex"
      >
        <Card
          sx={{
            width: "100%",
            minHeight: { xs: "50px", sm: "100px", md: "200px" },
          }}
          elevation={4}
        >
          <CardActionArea
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "row", sm: "column" },
            }}
            onClick={(e) => {
              handleClick();
            }}
            id={id}
          >
            <Typography variant={"h5"} component="span" color="primary">
              +
            </Typography>
            <Typography
              variant="body"
              component="span"
              color="primary"
              sx={{ fontSize: "1rem", display: { xs: "none", sm: "block" } }}
            >
              Add project
            </Typography>
          </CardActionArea>
        </Card>
      </Grid>
    </Grow>
  );
}

export default ProjectAdd;
