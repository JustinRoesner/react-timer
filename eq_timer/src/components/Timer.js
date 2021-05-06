import React from 'react';

class Timer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOn: false,
            maxTime: 30,
            currentTime: 30,
            maxMinutes: 1,
            maxSeconds: 30,
            currentMinutes: 1,
            currentSeconds: 30
        }

        this.startTimer = this.startTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.onMinutesChange = this.onMinutesChange.bind(this)
        this.onSecondsChange = this.onSecondsChange.bind(this)
    }

    startTimer(){
        this.setState({isOn: true})
        this.setState({currentTime: this.state.maxTime})
        this.setState({currentMinutes: this.state.maxMinutes})
        this.setState({currentSeconds: this.state.maxSeconds})

        if (1 === 1){
            console.log("inside test")
        }

        this.timer = setInterval(() => this.setState({
            currentTime: this.state.currentTime - 1,
            
        }), 1000)

        console.log("start")
    }

    resetTimer(){
        clearInterval(this.timer)
        this.setState({isOn: false })
        this.setState({currentTime: this.state.maxTime})
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
    
    render(){
            return (
            <div>
                <div>
                    <span className="firstLabel">Input minutes</span>
                    <span className="secondLabel">Input seconds</span>
                </div>
                <br/>
                <input type="number" value={this.state.maxMinutes} onChange={this.onMinutesChange} />
                <input type="number" value={this.state.maxTime} onChange={this.onSecondsChange} />
                <button onClick={this.startTimer}>Start</button>
                <button onClick={this.resetTimer}>Reset</button>
                <br/>
                <h1 style={{ fontSize: 40 }}>{this.state.currentTime}</h1>
                <h1 style={{ fontSize: 40 }}>{this.state.currentMinutes}:{this.state.currentSeconds}</h1>
            </div>
        );
    }
}

export default Timer;