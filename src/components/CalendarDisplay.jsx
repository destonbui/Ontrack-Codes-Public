import { useEffect, useState } from "react";
import { Badge, createTheme, ThemeProvider, Paper } from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";

import { CalendarPicker, CalendarPickerSkeleton } from "@mui/x-date-pickers";

import { PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { getHighlightedDays } from "../hooks/getHighlightedDays";

function CalendarDisplay({ selectedDate, setSelected, setMonth, month }) {
  const [loading, setLoading] = useState(true);
  const [highlightedDays, setHighlightedDays] = useState(null);

  const theme = createTheme({
    components: {
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            margin: 0,
            width: "300px",
          },
        },
      },
    },
  });

  useEffect(() => {
    setLoading(true);
    const fetchedResult = getHighlightedDays(`${month}`);

    fetchedResult.then((data) => {
      if (!data.highlightedDays) {
        setHighlightedDays([]);
      } else {
        setHighlightedDays(data.highlightedDays);
      }
      setLoading(false);
    });
  }, [month]);

  return (
    <ThemeProvider theme={theme}>
      <Paper
        sx={{
          minWidth: { xs: "100%", sm: 0 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CalendarPicker
          views={["day"]}
          date={selectedDate}
          loading={loading}
          renderLoading={() => <CalendarPickerSkeleton />}
          onChange={(newDate) => {
            setSelected(newDate);
          }}
          onMonthChange={(date) => {
            setMonth(date.month());
          }}
          disableFuture
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.date()) >= 0;

            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                //   color={isSelected ? "success" : undefined}
                //   variant="dot"
                badgeContent={
                  isSelected ? (
                    <BoltIcon sx={{ color: "#ffd600" }} />
                  ) : undefined
                }
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
      </Paper>
    </ThemeProvider>
  );
}

export default CalendarDisplay;
