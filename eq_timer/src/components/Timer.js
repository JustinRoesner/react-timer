import React, { useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Button from '@material-ui/core/Button';

//text field input
import TextField from '@material-ui/core/TextField';

//icon buttons
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

//switch
import { Switch } from '@material-ui/core';
import { PlayCircleFilledWhite } from '@material-ui/icons';

//grid
import {Grid} from '@material-ui/core';

//box
import Box from '@material-ui/core/Box';

//theme
import {
  createStyles,
  ThemeProvider
} from "@material-ui/core/styles";

//audio
import useEffect from "react";
import soundFile from '../assets/ff.mp3';

const useStyles = makeStyles((theme) => ({
    textField:{
        margin: theme.spacing(1),
        width: '11ch'
    },
    numberField:{
        margin: theme.spacing(1),
        color: '#dbedf3',
        width: '6ch'
    },
    button:{
        //margin: theme.spacing(1),
    },
    iconButton:{
        margin: theme.spacing(1),
        //margin: theme.spacing(1),
        color: '#dbedf3', //white 
        size: 'medium'
    }
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

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
const useAudio = url => {
    const [audio] = useState(new Audio(soundFile));
    //const [audio] = useState(new Audio("http://soundfxcenter.com/video-games/final-fantasy-xi/8d82b5_Final_Fantasy_XI_Caught_Fish_Sound_Effect.mp3"));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    React.useEffect(() => {
        audio.volume = 0.25;
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    React.useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
};
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

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
    const [editIsOn, setEditIsOn] = useState(true)

    //string
    const [nameOfBuff, setNameOfBuff] = useState('')

    //audio
    const [playing, toggle] = useAudio();

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
            toggle('true') // PLAY SOUND
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
    const switchEditMode = () => {
        if (editIsOn === true){
            setEditIsOn(false)
        }
        else{
            setEditIsOn(true)
        }
    }
    const classes = useStyles();
    return (
    //<div class="ui container" > 
    <div> 
        {/* </div><div class="ui input">  */}
                        {/*
            */}

            {/*
            <input class="ui input" 
                type="text" 
                placeholder="Name of buff..." 
                value={nameOfBuff} 
                onChange={onNameChange}/> 

            <input type="number" 
                min="0" 
                max="900" 
                size="1" 
                value={maxMinutes} 
                onKeyDown={blockInvalidInput} 
                onChange={onMinutesChange} />

            <input type="number" 
                min="0" 
                max="59" 
                size="1" 
                value={maxSeconds} 
                onKeyDown={blockInvalidInput} 
                onChange={onSecondsChange} />
            */}

            

        <Box pl={6} pr={6}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <label style={{ fontSize: 25, color: "#dbedf3"}}>{nameOfBuff}</label>
                </Grid>
                <Grid item xs={6}>
                    <div class="ui one column stackable center aligned page grid">
                        <div class="column twelve wide">
                            <label style={{ fontSize: 20, color: "#dbedf3"}}>{currentMinutes} mins {currentSeconds} secs</label>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <ProgressBar
                completed={progress}
                bgColor="#f73859"
                baseBgColor="#404b69"
                labelColor="#ffffff"
                isLabelVisible={false}
                />

            <Grid container spacing={1}>

                <Grid item xs={6}>
                    {/* TODO: HOW TO RETURN MORE THAN ONE STATEMENT }
                    {/* TODO: MATERIAL SET MAXIMUM NUMBER AND REVALIDATE NEGATIVE NUMBERS}
                    {/* editing */}
                    <IconButton className={classes.iconButton} aria-label="" onClick={switchEditMode}>
                        <EditIcon />
                    </IconButton>

                    {editIsOn ? (
                        <TextField InputProps={{ className: classes.textField}} id="standard-basic" label="Name of Buff" value={nameOfBuff} onChange={onNameChange} />
                        //<TextField className={classes.textField} id="standard-basic" label="Name of Buff" value={nameOfBuff} onChange={onNameChange} />
                        ): (
                        <div></div>
                    )}
                    {editIsOn ? (
                        <TextField InputProps={{ className: classes.numberField}} id="standard-basic" label="Minutes" type="number" value={maxMinutes} onKeyDown={blockInvalidInput} onChange={onMinutesChange} />
                        //<TextField className={classes.numberField} id="standard-basic" InputProps={{ InputProps: {min: 0} }} label="Minutes" type="number" value={maxMinutes} onKeyDown={blockInvalidInput} onChange={onMinutesChange} />
                        ): (
                        <div></div>
                    )}
                    {editIsOn ? (
                        <TextField InputProps={{ className: classes.numberField}} id="standard-basic" min="0" max="59" label="Seconds" type="number" value={maxSeconds} onKeyDown={blockInvalidInput} onChange={onSecondsChange} />
                        //<TextField InputLabelProps={{classes:{root: classes.cssLabel, focused: classes.cssLabel}}}InputProps={{className: classes.numberField, focused: classes.cssFocused, notchedOutline: classes.notchedOutline}} id="standard-basic" min="0" max="59" label="Seconds" type="number" value={maxSeconds} onKeyDown={blockInvalidInput} onChange={onSecondsChange} />
                        //<TextField className={classes.numberField} id="standard-basic" min="0" max="59" label="Seconds" type="number" value={maxSeconds} onKeyDown={blockInvalidInput} onChange={onSecondsChange} />
                        ): (
                        <div></div>
                    )}
                 
                </Grid>
                <Grid item xs={6}>
                    <div class="ui one column stackable center aligned page grid">
                        <div class="column twelve wide">
                            {/* buttons */}
                            <IconButton className={classes.iconButton} aria-label="" onClick={startTimer}>
                                <PlayArrowIcon />
                            </IconButton>

                            <IconButton className={classes.iconButton} aria-label="" onClick={resetTimer}>
                                <RefreshIcon />
                            </IconButton>

                            <IconButton className={classes.iconButton} aria-label="" onClick={()=> props.removeTimer(props.timerId)}>
                                <DeleteForeverIcon />
                            </IconButton>
                            {/* 
                            <Switch
                                className={classes.iconButton}
                                Switch
                                //checked={state.checkedA}
                                //onChange={handleChange}
                                name="checkedA"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                            */}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box> 
        {/*
        <Player />
        */}
    </div>
    );
}
export default Timer;