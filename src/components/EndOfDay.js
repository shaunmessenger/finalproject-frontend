import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AlertDialogSlide from './PopUp';
import Expense from "./MaterialUI/Expense";
import SubmitButton from './MaterialUI/SignupSubmit';




class EndOfDayForm extends Component {
    constructor() {
        super();
        this.state = {
            daySavings: null,
            dayRollover:null,
            open: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSavings = this.handleSavings.bind(this)
        this.handleRollover = this.handleRollover.bind(this)

    }

    handleSubmit(evt) {
        evt.preventDefault();
        // if(this.state.daySavings && this.state.dayRollover){
        
        let notStateDaySavings = this.state.daySavings
        if (!notStateDaySavings){
            notStateDaySavings = 0
        }
        let notStateRolloverAmount = this.state.dayRollover
        if (!notStateRolloverAmount){
            notStateRolloverAmount = 0
        }


        this.setState({open: !this.state.open})
        let bod;
        if (this.props.todaysBudget > 0) {
            bod = JSON.stringify({
                userID: this.props.userID,
                savedAmount: notStateDaySavings,
                rolloverAmount: notStateRolloverAmount
            })}
    else {

            bod = JSON.stringify({
                userID: this.props.userID,
                savedAmount: 0,
                rolloverAmount: this.props.todaysBudget
            })
}
        console.log(bod)
        fetch('/endOfDay', {
            method: 'POST',
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
    // }
    }

    handleSavings(evt) {
        this.setState({ daySavings: evt.target.value })
    }
    handleRollover(evt) {
        this.setState({ dayRollover: evt.target.value })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.props.history.push('/getSavingsStatus')
    };
 


    render() {
        let text;
        if (this.state.daySavings > this.props.dailySaveGoal){
            text = "You surpassed your daily save goal! Congratulations!"
        } else if (this.state.daySavings < this.props.dailySaveGoal && this.state.daySavings > 0) {
            text = "You didn't reach your goal, but you still managed to save something!"
        } else if (this.state.daySavings === this.props.dailySaveGoal){
            text = "You hit your daily save goal for the day! Keep it up!"
        } else {
            text = "You didn't manage to save anything today. Take it easy on the spending tomorrow! "
        }
        return (
            
            <div className='login-container'>
            <AlertDialogSlide open={this.state.open} handleClose={this.handleClose} text={text}/>
                {(this.props.todaysBudget > 0) ?
                    <div>
                        <form >
                        
                            <h2>Done for the day?</h2>
                            <div>Your daily save goal: ${this.props.dailySaveGoal}</div>
                            <div>Budget remaining: ${this.props.todaysBudget}</div>
                            <div>
                            Add to savings:

            
                                <Expense value={this.state.daySavings}
                                onChange={this.handleSavings}
                                label={'$' + this.props.dailySaveGoal}/>
                                
                                </div>
                                <div>
                            Rollover to tomorrow:
    <Expense 
    label={'$' + (this.props.todaysBudget - this.state.daySavings)}
    value={this.state.dayRollover}
    onChange={this.handleRollover}
    />


                                </div>
                            <SubmitButton onClick={this.handleSubmit}/>
                        </form>
                    </div> :


                    <div>
                        {/* <form onSubmit={this.handleSubmit}> */}
                        You over spent today, the balance has been deducted from tomorrow's budget
                {/* <input type='submit' value="go back"/> */}
                        <SubmitButton onClick={this.handleSubmit}/>
                        {/* </form> */}
                    </div>


                }


            </div>
        )


        // return (
            
        //     <div className='login-container'>
        //     <AlertDialogSlide open={this.state.open} handleClose={this.handleClose} text={text}/>
        //         {(this.props.todaysBudget > 0) ?
        //             <div>
        //                 <form onSubmit={this.handleSubmit}>
                        
        //                     <h2>Done for the day?</h2>
        //                     <div>Your daily save goal: ${this.props.dailySaveGoal}</div>
        //                     <div>Budget remaining: ${this.props.todaysBudget}</div>
        //                     <div>
        //                     Add to savings:
        //         <input placeholder={'$' + this.props.dailySaveGoal}
        //                         value={this.state.daySavings}
        //                         onChange={this.handleSavings} />
        //                         </div>
        //                         <div>
        //                     Rollover to tomorrow:
        //         <input placeholder={'$' + (this.props.todaysBudget - this.state.daySavings)}
        //                         value={this.state.dayRollover}
        //                         onChange={this.handleRollover} />
        //                         </div>
        //                     <input type="submit" />
        //                 </form>
        //             </div> :


        //             <div>
        //                 <form onSubmit={this.handleSubmit}>You over spent today, the balance has been deducted from tomorrow's budget
        //         <input type='submit' value="go back"/>
        //                 </form>
        //             </div>


        //         }


        //     </div>
        // )











    }
}

let EndOfDay = withRouter(EndOfDayForm)
export default EndOfDay;

//jainal 16/8/2018