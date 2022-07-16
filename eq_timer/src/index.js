import React, { useState } from "react";
import ReactDOM from "react-dom";
import Timer from "./components/Timer";

//icon buttons
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

//box
import Box from "@material-ui/core/Box";

//theme
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme/theme";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  iconButton: {
    color: "#dbedf3",
    size: "medium",
  },
}));

function App() {
  const [timerIds, setTimerIds] = useState([
    {
      id: 0,
      isVisible: true,
    },
  ]);
  const [timerId, setTimerId] = useState(0); // current timer id this will increment each one

  const removeTimer = (timerId) => {
    const modifiedTimers = timerIds.map((timer) => {
      if (timer.id === timerId) {
        return { id: timer.id, isVisible: false };
      } else {
        return timer;
      }
    });
    setTimerIds(modifiedTimers);
  };

  const addTimer = () => {
    const tempTimerId = timerId + 1;
    setTimerId(tempTimerId);
    setTimerIds([...timerIds, { id: tempTimerId, isVisible: true }]);
  };

  const classes = useStyles();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box p={3}>
          <h1 style={{ color: "#dbedf3" }}>Timer</h1>
        </Box>
        <div>
          {timerIds.map((id) => {
            if (id.isVisible) {
              return <Timer timerId={id.id} removeTimer={removeTimer} />;
            } else {
              return null;
            }
          })}

          <br />

          <div class="ui one column stackable center aligned page grid">
            <div class="column twelve wide">
              <IconButton
                className={classes.iconButton}
                aria-label=""
                onClick={addTimer}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
ReactDOM.render(<App />, document.querySelector("#root"));
