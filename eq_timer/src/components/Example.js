import React from 'react';

class Example extends React.Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: 90 };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
      this.onMinutesChange = this.onMinutesChange.bind(this);
      this.onSecondsChange = this.onSecondsChange.bind(this);
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }
  
    startTimer() {
      if (this.timer == 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }
  
    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds == 0) { 
        clearInterval(this.timer);
      }
    }

    onMinutesChange(e){
        console.log("min ok")
    }

    onSecondsChange(e){
        //this.setState({maxTime: e.target.value})
        //this.setState({maxSeconds: e.target.value})
        this.setState({seconds: e.target.value})
        console.log("sec ok")
    }
  
    render() {
      return(
        <div>
          <input type="number" value={this.state.time.m} onChange={this.onMinutesChange} />
          <input type="number" value={this.state.time.s} onChange={this.onSecondsChange} />
          <button onClick={this.startTimer}>Start</button>
          m: {this.state.time.m} s: {this.state.time.s}
        </div>
      );
    }
  }
  
  export default Example;