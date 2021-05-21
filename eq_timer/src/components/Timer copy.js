import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import { Switch } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

/*
const useStyles = makeStyles((theme) => ({
    button:{
        margin: theme.spacing(1),
    },
}))
*/

class Timer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hidden: false,
            isOn: false,
            maxTime: 30,
            currentTime: 30,
            maxMinutes: 0,
            maxSeconds: 30,
            currentMinutes: 0,
            currentSeconds: 30,
            progress: 0,
            shakeIsOn: false,
            nameOfBuff: "",
            timerId: props.timerId,
        }
        this.startTimer = this.startTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.onMinutesChange = this.onMinutesChange.bind(this)
        this.onSecondsChange = this.onSecondsChange.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.countDown = this.countDown.bind(this)
        this.findProgress = this.findProgress.bind(this)
        this.setShake = this.setShake.bind(this)
    }
    startTimer(){
        if (!this.state.isOn){
            this.setState({isOn: true})
            this.setState({currentTime: this.state.maxTime})
            this.setState({currentMinutes: this.state.maxMinutes})
            this.setState({currentSeconds: this.state.maxSeconds})
            this.findProgress();
            this.timer = setInterval(this.countDown, 1000)
        }
        /*
        this.timer = setInterval(() => this.setState({
            currentTime: this.state.currentTime - 1,
            
        }), 1000)
        */
        console.log("start")
    }
    countDown(){
        //debugger
        console.log("secs:")
        console.log(this.state.currentSeconds)
        console.log("mins:")
        console.log(this.state.currentMinutes)
        //i dont have seconds or mins
        if (this.state.currentSeconds === 0 && this.state.currentMinutes === 0){
            console.log("end the countdown")
            clearInterval(this.timer)
            this.setState({isOn: false})
        }
        //i dont have seconds but i have mins
        if (this.state.currentSeconds == 0 && this.state.currentMinutes > 0){
            console.log("sub from mins for secs")
            this.setState({currentMinutes: this.state.currentMinutes - 1})
            this.setState({currentSeconds: this.state.currentSeconds + 60})
        }
        //i have seconds
        if (this.state.currentSeconds > 0){
            console.log("- 1 sec")
            this.setState({currentSeconds: this.state.currentSeconds - 1})
        }
        this.findProgress();
        //this.setShake();
    }
    findProgress(){
        let sec = this.state.currentSeconds;
        let min = this.state.currentMinutes;
        let maxSec = this.state.maxSeconds;
        let maxMin = this.state.maxMinutes;

        min = min * 60
        maxMin = maxMin * 60

        sec = min + sec
        maxSec = +maxMin + +maxSec

        this.setState({progress: sec / maxSec * 100})
    }
    setShake(){
        if (this.state.progress === 0){
            this.setState({shakeIsOn: true})
        }
        else{
            this.setState({shakeIsOn: false})
        }
    }
    resetTimer(){
        clearInterval(this.timer)
        this.setState({isOn: false })
        this.setState({currentMinutes: this.state.maxMinutes})
        this.setState({currentSeconds: this.state.maxSeconds})
        this.setState({currentTime: this.state.maxTime})
        this.setState({progress: 0})
        console.log("reset");
    }
    onMinutesChange(e){
        this.setState({maxMinutes: e.target.value})
        console.log("min ok")
    }
    onSecondsChange(e){
        this.setState({maxTime: e.target.value})
        this.setState({maxSeconds: e.target.value})
        console.log("sec ok")
    }
    onNameChange(e){
        this.setState({nameOfBuff: e.target.value})
        console.log("name ok")
    }
    render(){
            //const classes = useStyles();
            return (
            <div class="ui container" style={{ marginLeft: '100px' }}>
                <br/>
                <div class="ui input">
                    <input class="ui input" type="text" placeholder="Name of buff..." value={this.state.nameOfBuff} onChange={this.onNameChange}/>
                    <input type="number" min="0" size="5" value={this.state.maxMinutes} onChange={this.onMinutesChange} />
                    <input type="number" min="0" max="60" size="5" value={this.state.maxSeconds} onChange={this.onSecondsChange} />
                    {/*
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<PlayArrowIcon />}
                    ></Button>
                    */}
                    <button onClick={this.startTimer}>Start</button>
                    <button onClick={this.resetTimer}>Reset</button>
                    <Switch
                      Switch
                      //checked={state.checkedA}
                      //onChange={handleChange}
                      name="checkedA"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <button onClick={()=> this.props.removeTimer(this.props.timerId)}>Delete</button>
                </div>
                <br/>
                <label style={{ fontSize: 25, color: "#dbedf3"}}>{this.state.nameOfBuff}</label>
                <label style={{ fontSize: 20, color: "#dbedf3"}}>{this.state.currentMinutes} mins {this.state.currentSeconds} secs</label>
                    <ProgressBar
                     completed={this.state.progress}
                     bgColor="#f73859"
                     //bgColor="#e8871b"
                     baseBgColor="#404b69"
                     labelColor="#ffffff"
                     isLabelVisible={false}
                     />
            </div>
            );
    }
}
export default Timer;