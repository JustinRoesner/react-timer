import React from 'react';
import ReactDOM from 'react-dom';
//import App from './components/App';
import Timer from './components/Timer';

class App extends (React.Component){
    state = {
        timers: []
    }

    addTimer = () => {
        this.setState({
            timers: [...this.state.timers, <Timer />]
        })
    }

    render(){
        return(
            <div>
                <h1>eq_timer</h1>
                <Timer />

                <div>
                    {this.state.timers}
                    <button onClick={this.addTimer}>New</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
