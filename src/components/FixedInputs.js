import React, { Component } from "react";


class FixedInputs extends Component{
   constructor(){
   super();
   this.state = {
       income: "",
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
}

handleSubmit = event => {
    event.preventDefault()
    let newIncome =  this.state.inputIncome
    let newHousing = this.state.inputHousing
    let newTransport =  this.state.inputTransport
    let newFood = this.state.inputFood
    let newOther = this.state.inputOther
    this.setState({
        income: newIncome,
        housing: newHousing,
        transport: newTransport,
        food: newFood,
        other: newOther    
    }) 
    fetch('/setUpFixed',{ 
        method: "POST",
        body: (JSON.stringify({
            userID: 4755,
            fixedIncome: {
                Amount: newIncome,
                Type: 'biweekly'
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
        console.log(response)
        //console.log(response)
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


   render(){
       return(
        <div>
        <h2>Income and Fixed Expenses</h2>
        <form onSubmit={this.handleSubmit}>
            <input
                type="text"
                placeholder="monthly income"
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


export default FixedInputs;