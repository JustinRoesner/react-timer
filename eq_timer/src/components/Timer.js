import React, { useState } from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { Switch } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    button:{
        margin: theme.spacing(1),
    },
}))

const useInterval = (callback, delay) => {
    const intervalId = React.useRef(null);
    const savedCallback = React.useRef(callback);
  
    React.useEffect(() => {
      savedCallback.current = callback;
    });
  
    React.useEffect(() => {
      const tick = () => savedCallback.current();
  
      if (typeof delay === "number") {
        intervalId.current = window.setInterval(tick, delay);
  
        return () => window.clearInterval(intervalId.current);
      }
    }, [delay]);
  
    return intervalId.current;
  };

function Timer(props) {
    //num
    const [progress, setProgress] = useState(100)

    const [currentMinutes, setCurrentMinutes] = useState(0)
    const [maxMinutes, setMaxMinutes] = useState(0)

    const [currentSeconds, setCurrentSeconds] = useState(30)
    const [maxSeconds, setMaxSeconds] = useState(30)

    const [currentTime, setCurrentTime] = useState(30)
    const [maxTime, setMaxTime] = useState(30)

    const [timerId, setTimerId] = useState(props.timerId)

    //bool
    const [isOn, setIsOn] = useState(false)
    const [shakeIsOn, setShakeIsOn] = useState(false)

    //string
    const [nameOfBuff, setNameOfBuff] = useState('')

    useInterval(() =>{
        countDown()
    }, isOn === true ? 1000 : null)

    const startTimer = () => {
        if (!isOn){
            setIsOn(true)
            setCurrentMinutes(maxMinutes)
            setCurrentSeconds(maxSeconds)
            setCurrentTime(maxTime)
            findProgress()
        }
        console.log("start")
    }
    const countDown = () => {
        //debugger
        console.log("secs:")
        console.log(currentSeconds)
        console.log("mins:")
        console.log(currentMinutes)
        //i dont have seconds or mins
        if (currentSeconds === 0 && currentMinutes === 0){
            console.log("end the countdown")
            setIsOn(false)
        }
        //i dont have seconds but i have mins
        if (currentSeconds == 0 && currentMinutes > 0){
            console.log("sub from mins for secs")
            setCurrentMinutes(currentMinutes - 1)
            setCurrentSeconds(+currentSeconds + 59)
        }
        //i have seconds
        if (currentSeconds > 0){
            console.log("- 1 sec")
            setCurrentSeconds(currentSeconds - 1)
        }
        findProgress();
        //this.setShake();
    }
    const findProgress = () => {
        let sec = currentSeconds;
        let min = currentMinutes;
        let maxSec = maxSeconds;
        let maxMin = maxMinutes;

        min = min * 60
        maxMin = maxMin * 60

        sec = min + sec - 1 
        maxSec = +maxMin + +maxSec
        setProgress(sec / maxSec * 100)
    }
    const setShake = () => {
        if (progress === 0){
            setShakeIsOn(true)
        }
        else{
            setShakeIsOn(false)
        }
    }
    const resetTimer = () => {
        setIsOn(false)
        setCurrentMinutes(maxMinutes)
        setCurrentSeconds(maxSeconds)
        setCurrentTime(maxTime)
        setProgress(100)
        console.log("reset");
    }
    const onMinutesChange = (e) => {
        setMaxMinutes(e.target.value)
        setCurrentMinutes(e.target.value)
        console.log("min ok")
    }
    const onSecondsChange = (e) => {
        setMaxTime(e.target.value)
        setMaxSeconds(e.target.value)
        setCurrentSeconds(e.target.value)
        console.log("sec ok")
    }
    const onNameChange = (e) => {
        setNameOfBuff(e.target.value)
        console.log("name ok")
    }
    const blockInvalidInput = (e) => {
        ['+', '-'].includes(e.key) && e.preventDefault()
    }
    const classes = useStyles();
    return (
    <div class="ui container" style={{ marginLeft: '100px' }}>
        <br/>
        <div class="ui input">
            <input class="ui input" type="text" placeholder="Name of buff..." value={nameOfBuff} onChange={onNameChange}/>
            <input type="number" min="0" size="5" value={maxMinutes} onKeyDown={blockInvalidInput} onChange={onMinutesChange} />
            <input type="number" min="0" max="59" size="5" value={maxSeconds} onKeyDown={blockInvalidInput} onChange={onSecondsChange} />

            <Button
                onClick={startTimer}
                variant="contained"
                color="default"
                className={classes.button}
                size="small"
            >{<PlayArrowIcon />}</Button>

            <Button
                onClick={resetTimer}
                variant="contained"
                color="default"
                className={classes.button}
                size="small"
            >{<RefreshIcon/>}</Button>

            <Button
                onClick={()=> props.removeTimer(props.timerId)}
                variant="contained"
                color="default"
                className={classes.button}
                size="small"
            >{<DeleteForeverIcon/>}</Button>

            <Switch
                Switch
                //checked={state.checkedA}
                //onChange={handleChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </div>

        <br/>

        <label style={{ fontSize: 25, color: "#dbedf3"}}>{nameOfBuff}</label>
        <label style={{ fontSize: 20, color: "#dbedf3"}}>{currentMinutes} mins {currentSeconds} secs</label>
            <ProgressBar
                completed={progress}
                bgColor="#f73859"
                //bgColor="#e8871b"
                baseBgColor="#404b69"
                labelColor="#ffffff"
                isLabelVisible={false}
                />
    </div>
    );
}
export default Timer;