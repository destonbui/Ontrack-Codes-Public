import { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";

import dayjs from "dayjs";
import CalendarDisplay from "./CalendarDisplay";
import ActivitiesDisplay from "./ActivitiesDisplay";
import UpcomingTasksDisplay from "./UpcomingTasksDisplay";

function UserActionsDisplay() {
  const [selectedDate, setSelected] = useState(dayjs());
  const [month, setMonth] = useState(dayjs().month());

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
        <UpcomingTasksDisplay />
      </Grid>
      <Grid xs={12} sm={6} md={6} lg={5} xl={4}>
        <CalendarDisplay
          selectedDate={selectedDate}
          setSelected={setSelected}
          month={month}
          setMonth={setMonth}
        />
      </Grid>

      <Grid xs={12} sm={6} md={6} lg={7} xl={8}>
        <ActivitiesDisplay selectedDate={selectedDate} />
      </Grid>
    </Grid>
  );
}

export default UserActionsDisplay;
