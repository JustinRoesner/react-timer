import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/Timer';
//import { createMuiTheme } from '@material-ui/core/styles';
//import { purple } from '@material-ui/core/colors';
//import { green } from '@material-ui/core/colors';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import classes from '*.module.css';

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
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height:'100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3),
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    logo: {
      maxWidth: '300px',
      alignSelf: 'center'
    },
  }));
   

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
            <div className={useStyles.root}>
                <Paper className={useStyles.paper}> 
                <h1>eqtimer</h1>
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
                </Paper> 
            </div>
        )
    }
}
ReactDOM.render(<App />, document.querySelector('#root'));