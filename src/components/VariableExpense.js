import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LoginSubmitButton from "./MaterialUI/LoginSubmitButton";
import Expense from "./MaterialUI/Expense";

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
      <div className="login-container">
        <div className="var-submit">
          <h2>Submit expense</h2>
        </div>  
          {/* Jordan did this component in-line, since sending props would have been difficult */}
          <FormControl>
            <InputLabel/>
            <Select value={this.state.expenseType} onChange={this.newExpenseType}>
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="coffee">Coffee, I really needed it</MenuItem>
              <MenuItem value="transport">Transport</MenuItem>
              <MenuItem value="shopping">Shopping</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Expense
            label={"$"}
            value={this.state.expenseAmt}
            onChange={this.handleNewExpense}
          />
          <br />
          <div className="var-submit"> <LoginSubmitButton onClick={this.handleSubmit} /></div>
        
      </div>
    );
  }
}

let VariableExpense = withRouter(VariableExpenseForm);
export default VariableExpense;

//Jainal 15/7/2018
