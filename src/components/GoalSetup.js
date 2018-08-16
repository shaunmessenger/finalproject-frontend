import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';



class GoalSetupForm extends Component {
    constructor() {
        super();
        this.state ={
            goalValue: null,
            goalDate: "",
            goalType:"vacation"
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.newGoalDate = this.newGoalDate.bind(this)
        this.newGoalValue = this.newGoalValue.bind(this)
        this.newGoalType = this.newGoalType.bind(this)
        this.renderFixedInput = this.renderFixedInput.bind(this)
    }

    handleSubmit(evt){
        evt.preventDefault();
        //check for missing input
        let bod = JSON.stringify({ 
            userID: this.props.userID, 
            goal:{
            amount: this.state.goalValue,
            endDate: this.state.goalDate,
            type: this.state.goalType
            }
        });
        console.log(bod)
        fetch('./setUpGoal', {
            method: 'POST',
            body: bod
        })
        .then(response => response.text())
        .then(response => {

            let parsed = JSON.parse(response)
            console.log(parsed)
            if (parsed.unrealistic){
                this.setState({
                    unrealistic: true, 
                    dailySaveGoal: parsed.dailySaveGoal
                })
            } else {
            this.setState({dailySaveGoal: parsed.dailySaveGoal})
            this.props.sendSaveGoalToApp(parsed.dailySaveGoal)
            this.props.history.push('/setUpFixed')
            }
        })
    }
    
    newGoalValue(evt){
        this.setState({goalValue: evt.target.value})
    }

    newGoalDate(evt){
        this.setState({goalDate:evt.target.value})
    }
    newGoalType(evt){
        this.setState({goalType: evt.target.value})
    }
    renderFixedInput() {
        this.props.sendSaveGoalToApp(this.state.dailySaveGoal)
        this.props.history.push('/setUpFixed')
    }

    render(){
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <h2>Define your Goals</h2>
                <select name="goals" 
                        value={this.state.goalType} 
                        onChange ={this.newGoalType}>
                    <option value="vacation">Vacation</option>
                    <option value="newCar">New car</option>
                    <option value="payLoan">Pay off loan</option>
                </select>
                <br></br>
                <input placeholder="Goal Amount"
                       value = {this.state.goalValue}
                       onChange = {this.newGoalValue}/>
                <br></br>
                <input placeholder="MM/DD/YYYY"
                       value = {this.state.goalDate}
                       onChange = {this.newGoalDate}/>       
                <br></br>
                <input type="submit"/>
            </form>
            <p>
                {
                    (this.state.unrealistic)?
                    <p>A daily savings goal of ${this.state.dailySaveGoal} 
                     might not be realistic. Modify your goal, or click 
                    <button onClick={this.renderFixedInput}>here</button> 
                    to continue </p>: null
                }
            </p>    
        </div>
        )
    }
}

let GoalSetup = withRouter(GoalSetupForm)
export default GoalSetup;






//Jainal 15/7/2018