import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/Timer';

/*
const theme = createMuiTheme({
    palette: {
        primary: {
          main: purple[500],
        },
        secondary: {
          main: green[500],
        },
      },
});
*/

class App extends (React.Component){
    state = {
        timerIds: [{
            id: 0,
            isVisible: true
        }], 
        timerId: 0    // current timer id this will increment each one
    }
   
    //TODO
    //ON MOUNT RUN ADD TIMER FOR THE FIRST TIME
    removeTimer = (timerId) => {
        const modifiedTimers = this.state.timerIds.map (timer => {
                            if (timer.id === timerId){
                                return {id: timer.id, isVisible: false}
                            }
                            else{
                                return timer 
                            }})

        this.setState({
            //timerIds: this.state.timerIds.filter(id => id != timerId)
            timerIds: modifiedTimers 
            })
    }
    addTimer = () => {
        const timerId = this.state.timerId + 1
        this.setState({
            timerId: timerId,
            timerIds: [...this.state.timerIds, {id: timerId, isVisible: true}],
        })
    }
    render(){
        return(
            <div>
                <h1 style={{color: "#dbedf3"}}>eqtimer</h1>
                <div>
                    {this.state.timerIds.map (id => {
                        if (id.isVisible){
                            return <Timer timerId={id.id} removeTimer={this.removeTimer} />
                        }
                        else{
                            return null
                        }
                    })}

                    <br/>

                    <div class="ui one column stackable center aligned page grid">
                        <div class="column twelve wide">
                            <button onClick={this.addTimer}>+</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));