import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class VariableExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      expenseType: "food",
      expenseAmt: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewExpense = this.handleNewExpense.bind(this);
    this.newExpenseType = this.newExpenseType.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.state.expenseAmt){
    let bod = JSON.stringify({
      userID: this.props.userID,
      expense: {
        amount: this.state.expenseAmt,
        type: this.state.expenseType
      }
    });

    fetch("./inputVariable", {
      method: "POST",
      body: bod
    })
      .then(response => response.text())
      .then(response => {
        let parsed = JSON.parse(response);
        let todaysBudget = parsed.todaysBudget;
        let todaysVariable = parsed.todaysVariable;
        this.props.sendInfoToApp(todaysBudget, todaysVariable);
        console.log(parsed);
        this.props.history.push("/getSavingsStatus");
      });
    }    
  }
  newExpenseType(evt) {
    this.setState({ expenseType: evt.target.value });
  }
  handleNewExpense(evt) {
    this.setState({ expenseAmt: evt.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Submit Expense</h2>
          <select
            name="expenses"
            value={this.state.expenseType}
            onChange={this.newExpenseType}
          >
            <option value="food">Food</option>
            <option value="coffee">Coffee, I needed it</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
          </select>
          <br />
          <input
            placeholder="Expense amount"
            value={this.state.expenseAmt}
            onChange={this.handleNewExpense}
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

let VariableExpense = withRouter(VariableExpenseForm);
export default VariableExpense;

//Jainal 15/7/2018
