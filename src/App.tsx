import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Slider } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ToggleButton from "@mui/material/ToggleButton";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
  }
}

interface dataforApi {
  speed: number;
  UpButton: boolean;
  DownButton: boolean;
  LeftButton: boolean;
  RightButton: boolean;
}

function dataforSend(data: dataforApi) {
  axios
    .post("/api/RabotUpdate", data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
  });
}

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides:{
        root:{
          "border-bottom": '0px'
        } 
      }
    },
  },
});

export default function RabotRoverApp() {
  const [leftward, setLeftward] = React.useState(false);
  const [rightward, setRightward] = React.useState(false);
  const [upward, setUpward] = React.useState(false);
  const [downward, setDownward] = React.useState(false);
  const [speed, setSpeed] = React.useState(2);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function PrepareDatatoSend() {
    let myObj = {
      speed: speed,
      UpButton: upward,
      DownButton: downward,
      LeftButton: leftward,
      RightButton: rightward,
    };
    dataforSend(myObj);
    console.log(myObj);
  }

  function onSliderChangeHandler(
    event: React.SyntheticEvent | Event,
    value: number | number[]
  ) {
    setSpeed(value as number);
  }

  React.useEffect(() => {
    PrepareDatatoSend();
  }, [speed, upward, downward, rightward, leftward, PrepareDatatoSend]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AirportShuttleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Rabot Rover
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Box sx={{ width: 300, height: 300 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>
                        <ToggleButton
                          color="primary"
                          value="check"
                          selected={upward}
                          onChange={() => {
                            setUpward(!upward);
                            if (downward === true) {
                              setDownward(!downward);
                            }
                          }}
                        >
                          <ArrowUpwardIcon />
                        </ToggleButton>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <ToggleButton
                          color="primary"
                          value="check"
                          selected={leftward}
                          onChange={() => {
                            setLeftward(!leftward);
                            if (rightward === true) {
                              setRightward(!rightward);
                            }
                          }}
                        >
                          <ArrowBackIcon />
                        </ToggleButton>
                      </TableCell>
                      <TableCell>
                        <ToggleButton
                          color="primary"
                          value="check"
                          selected={downward}
                          onChange={() => {
                            setDownward(!downward);
                            if (upward === true) {
                              setUpward(!upward);
                            }
                          }}
                        >
                          <ArrowDownwardIcon />
                        </ToggleButton>
                      </TableCell>
                      <TableCell>
                        <ToggleButton
                          color="primary"
                          value="check"
                          selected={rightward}
                          onChange={() => {
                            setRightward(!rightward);
                            if (leftward === true) {
                              setLeftward(!leftward);
                            }
                          }}
                        >
                          <ArrowForwardIcon />
                        </ToggleButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>

              <Box sx={{ height: 300 }}>
                <Slider
                  sx={{
                    '& input[type="range"]': {
                      WebkitAppearance: "slider-vertical",
                    },
                  }}
                  orientation="vertical"
                  value={speed || 2}
                  step={1}
                  min={1}
                  max={5}
                  marks={marks}
                  aria-label="Speed"
                  onKeyDown={preventHorizontalKeyboardNavigation}
                  onChangeCommitted={onSliderChangeHandler}
                  //onChangeCommitted={() => setSpeed(this.value)}
                />
              </Box>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}