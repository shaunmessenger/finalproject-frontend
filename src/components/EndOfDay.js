import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AlertDialogSlide from './PopUp';




class EndOfDayForm extends Component {
    constructor() {
        super();
        this.state ={
            daySavings: null,
            dayRollover:null,
            open: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSavings = this.handleSavings.bind(this)
        this.handleRollover = this.handleRollover.bind(this)
        
    }

    handleSubmit(evt){
        evt.preventDefault();
        this.setState({open: !this.state.open})
        let bod = JSON.stringify({
            userID:   this.props.userID,
            savedAmount: this.state.daySavings,
            rolloverAmount: this.state.dayRollover
        });
        console.log(bod)
        fetch('/endOfDay', {
            method:'POST',
            body: bod
        })
        .then(response => response.text())
        .then(response => {
            let parsed = JSON.parse(response)
            console.log(parsed)
            let todaysBudget = parsed.todaysBudget
            let todaysVariable = parsed.todaysVariable
            this.props.sendInfoToApp(todaysBudget, todaysVariable)
            
        })
    }

    handleSavings(evt) {
        this.setState({daySavings: evt.target.value})
    }
    handleRollover(evt) {
        this.setState({dayRollover: evt.target.value})
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.props.history.push('/getSavingsStatus')
    };
 

    render(){
        return (
        <div>
             <AlertDialogSlide open={this.state.open} handleClose={this.handleClose}/>
            <form onSubmit = {this.handleSubmit}>
                <h2>Done for the day?</h2>
                Add to savings:
                <input placeholder={'$' + this.props.dailySaveGoal}
                       value = {this.state.daySavings}
                       onChange = {this.handleSavings}/>
                Rollover to tomorrow: 
                <input placeholder={'$' + (this.props.todaysBudget - this.state.daySavings)}
                       value ={this.state.dayRollover}
                       onChange={this.handleRollover}/>
                <div>Your savings goal for today: ${this.props.dailySaveGoal}</div>
                <div>Budget remaining: ${this.props.todaysBudget}</div>
                <input type="submit"/>
            </form>                   
        </div>
        )
    }
}

let EndOfDay = withRouter(EndOfDayForm)
export default EndOfDay;

//jainal 16/8/2018