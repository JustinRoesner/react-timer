import React from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App';
import Timer from './components/Timer';

class App extends (React.Component){
    state = {
        timers: [],
        timerId: 0
    }
    addTimer = () => {
        this.setState({
            timerId: this.state.timerId + 1,
            timers: [...this.state.timers, <Timer timerId={this.state.timerId} removeTimer={this.state.removeTimer} />]
        })
    }
    removeTimer = (timerId) => {
    }
    render(){
        return(
            <div>
                <h1>eq_timer</h1>
                <Timer timerId={this.state.timerId} removeTimer={this.state.removeTimer}/>

                <div>
                    {this.state.timers}
                    <button onClick={this.addTimer}>New</button>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));
