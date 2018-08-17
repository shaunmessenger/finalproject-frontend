import React, { Component } from "react";
import { withRouter } from 'react-router-dom';


class FixedInputsBasic extends Component{
   constructor(props){
   super(props);
   this.state = {
       income: "",
       incomeType:"biweekly",
       housing: "",
       transport: "",
       food: "",
       other: "",
       inputIncome: "",
       inputHousing: "",
       inputTransport: "",
       inputFood: "",
       inputOther: ""
   }
   this.handleIncomeType = this.handleIncomeType.bind(this)
}

handleSubmit = event => {
    event.preventDefault()
    let newIncome =  this.state.inputIncome
    let newHousing = this.state.inputHousing
    let newTransport =  this.state.inputTransport
    let newFood = this.state.inputFood
    let newOther = this.state.inputOther
    let newIncomeType = this.state.incomeType
    this.setState({
        income: newIncome,
        incomeType: newIncomeType,
        housing: newHousing,
        transport: newTransport,
        food: newFood,
        other: newOther    
    }) 
    fetch('/setUpFixed',{ 
        method: "POST",
        body: (JSON.stringify({
            userID: this.props.userID,
            fixedIncome: {
                amount: newIncome,
                type: newIncomeType
            },
            fixedExpense: {
                Housing: newHousing,
                Transport: newTransport,
                Food: newFood,
                Other: newOther
            }
        }))
    })
    .then(response => response.text())
    .then(response => {
        let parsed = JSON.parse(response)
        console.log(parsed.todaysBudget)
        this.props.sendTodaysBudgetToApp(parsed.todaysBudget)
        this.props.history.push('/getSavingsStatus')

    })
        
        
    }


handleIncomeChange = event => {
    this.setState({inputIncome: event.target.value})
}
handleHousingChange = event => {
    this.setState({inputHousing: event.target.value})
}
handleTransportChange = event => {
    this.setState({inputTransport: event.target.value})
}
handleFoodChange = event => {
    this.setState({inputFood: event.target.value})
}
handleOtherChange = event => {
    this.setState({inputOther: event.target.value})
}

handleIncomeType(event){
    this.setState({incomeType: event.target.value})
}

   render(){
       return(
        <div>
        <h2>Income and Fixed Monthly Expenses</h2>
        <form onSubmit={this.handleSubmit}>
            <select name="income type"
            value={this.state.incomeType}
            onChange={this.handleIncomeType}>
        <option value="biweekly">Bi-weekly</option>
        <option value='monthly'>Monthly</option>
        <option value='yearly'>Yearly</option>
            </select>
            <input
                type="text"
                placeholder="$$$$"
                value={this.state.inputIncome}
                onChange={this.handleIncomeChange}/>
            <input
                type="text"
                placeholder="housing"
                value={this.state.inputHousing}
                onChange={this.handleHousingChange}/>
            <input
                type="text"
                placeholder="transport"
                value={this.state.inputTransport}
                onChange={this.handleTransportChange}/>
            <input
                type="text"
                placeholder="food"
                value={this.state.inputFood}
                onChange={this.handleFoodChange}/>
            <input
                type="text"
                placeholder="other"
                value={this.state.inputOther}
                onChange={this.handleOtherChange}/>
            <input type="submit"/>    
        </form>


        </div>
       )
   }
}

let FixedInputs = withRouter(FixedInputsBasic)
export default FixedInputs;