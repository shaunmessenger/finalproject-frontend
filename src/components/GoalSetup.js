import React, { Component } from 'react';




class GoalSetup extends Component {
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
        
    }

    handleSubmit(evt){
        evt.preventDefault();
        //check for missing input
        let bod = JSON.stringify({
            goalValue: this.state.goalValue,
            goalDate: this.state.goalDate,
            goalType: this.state.goalType
        });

        fetch('./setupGoal', {
            method: 'POST',
            body: bod
        })
        .then(response => response.text())
        .then(response => {
            let parsed = JSON.parse(response)
            console.log(parsed)
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
        </div>
        )
    }
}


export default GoalSetup;