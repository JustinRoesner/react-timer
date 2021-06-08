import React, { useState, Fragment } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';

//text field input
import TextField from '@material-ui/core/TextField';

//icon buttons
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import PauseIcon from '@material-ui/icons/Pause';

//grid
import {Grid} from '@material-ui/core';

//box
import Box from '@material-ui/core/Box';

//audio
import soundFile from '../assets/ff.mp3';
import menuSoundFile from '../assets/ffstart.mp3';

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
    },
    bar:{
        paddingTop: '3px',
        paddingBottom: '10px'
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
const useAudio = soundToUse => {
    const [audio] = useState(new Audio(soundToUse));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    React.useEffect(() => {
        audio.volume = 0.60;
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
const cleanValue = (e) => {
        return e.target.value > 0 ? e.target.value : 0
}
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
    const [playing, toggleSoundFile] = useAudio(soundFile);
    const [playingAgain, toggleMenuSoundFile] = useAudio(menuSoundFile);

    useInterval(() =>{
        countDown()
    }, isOn === true ? 1000 : null)

    const startTimer = () => {
        //if no time left in timer
        if (!isOn && currentMinutes + currentSeconds == 0){
            setIsOn(true)
            setCurrentMinutes(maxMinutes)
            setCurrentSeconds(maxSeconds)
            setCurrentTime(maxTime)
            findProgress()
            setEditIsOn(false)

            toggleMenuSoundFile('true') // PLAY SOUND
        }
        else{
            //if time left in timer
            setIsOn(true)
            findProgress()
            setEditIsOn(false)

            toggleMenuSoundFile('true') // PLAY SOUND
        }
        console.log("start")
    }
    const pauseTimer = () => {
        setIsOn(false)
    }
    const countDown = () => {
        console.log("secs:")
        console.log(currentSeconds)
        console.log("mins:")
        console.log(currentMinutes)
        //i dont have seconds or mins
        if (currentSeconds === 0 && currentMinutes === 0){
            console.log("end the countdown")
            setIsOn(false)
            toggleSoundFile('true') // PLAY SOUND
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
        const cleanedValue = cleanValue(e)
        setMaxMinutes(cleanedValue)
        setCurrentMinutes(cleanedValue)
        console.log("min ok")
    }
    const onSecondsChange = (e) => {
        const cleanedValue = cleanValue(e)
        setMaxTime(cleanedValue)
        setMaxSeconds(cleanedValue)
        setCurrentSeconds(cleanedValue)
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
    <div> 
        <Box pl={6} pr={6}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <label style={{ fontSize: 25, color: "#dbedf3"}}>{nameOfBuff}</label>
                </Grid>
                <Grid item xs={6}>
                    <div align="right">
                        {currentMinutes != 0 ? (
                                <span style={{ fontSize: 20, color: "#dbedf3"}}>{currentMinutes} &nbsp; mins &nbsp;{currentSeconds} &nbsp; secs</span>
                        ): (
                                <span style={{ fontSize: 20, color: "#dbedf3"}}>{currentSeconds} &nbsp; secs</span>
                        )}
                    </div>
                </Grid>
            </Grid>

            <Grid item spacing={1} className={classes.bar}>

                {isOn ? (
                    <ProgressBar
                        completed={progress}
                        bgColor="#ffd53d"
                        baseBgColor="#404b69"
                        labelColor="#ffffff"
                        isLabelVisible={false}
                        />
                ): (
                    <ProgressBar
                        completed={progress}
                        bgColor="#f73859"
                        baseBgColor="#404b69"
                        labelColor="#ffffff"
                        isLabelVisible={false}
                        />
                )}
            </Grid>

            <Grid container spacing={1}>

                <Grid item xs={7}>
                    {/* TODO: HOW TO RETURN MORE THAN ONE STATEMENT }
                    {/* TODO: MATERIAL SET MAXIMUM NUMBER AND REVALIDATE NEGATIVE NUMBERS}
                    {/* editing */}
                    <IconButton className={classes.iconButton} aria-label="" onClick={switchEditMode}>
                        <EditIcon />
                    </IconButton>

                    {editIsOn ? (
                        <Fragment>
                            <TextField InputProps={{ className: classes.textField}} id="standard-basic" autoComplete="off" label="Name of Buff" value={nameOfBuff} onChange={onNameChange} />
                            <TextField InputProps={{ className: classes.numberField}} id="standard-basic" label="Minutes" type="number" value={maxMinutes} onKeyDown={blockInvalidInput} onChange={onMinutesChange} />
                            <TextField InputProps={{ className: classes.numberField}} id="standard-basic" min="0" max="59" label="Seconds" type="number" value={maxSeconds} onKeyDown={blockInvalidInput} onChange={onSecondsChange} />
                        </Fragment>
                        ): (
                        <div></div>
                    )}
                 
                </Grid>
                <Grid item xs={5}>
                    <div align="right">
                        {/* icon buttons */}
                        {isOn ? (
                            <IconButton className={classes.iconButton} aria-label="" onClick={pauseTimer}>
                                <PauseIcon />
                            </IconButton>
                        ):(
                            <IconButton className={classes.iconButton} aria-label="" onClick={startTimer}>
                                <PlayArrowIcon />
                            </IconButton>
                        )}

                        <IconButton className={classes.iconButton} aria-label="" onClick={resetTimer}>
                            <RefreshIcon />
                        </IconButton>

                        <IconButton className={classes.iconButton} aria-label="" onClick={()=> props.removeTimer(props.timerId)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </div>
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