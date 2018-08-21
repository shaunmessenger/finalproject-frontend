import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FoodExpense from "./MaterialUI/FixedExpFood";
import HousingExpense from "./MaterialUI/FixedExpHousing";
import OtherExpense from "./MaterialUI/FixedExpOther";
import TransportExpense from "./MaterialUI/FixedExpTransport";
import IncomeInput from "./MaterialUI/FixedIncomeInput";
import SubmitButton from "./MaterialUI/FixedSubmitButton";
import Expense from "./MaterialUI/Expense";

class FixedInputsBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: "",
      incomeType: "biweekly",
      housing: "",
      transport: "",
      food: "",
      other: "",
      inputIncome: "",
      inputHousing: "",
      inputTransport: "",
      inputFood: "",
      inputOther: ""
    };
    this.handleIncomeType = this.handleIncomeType.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    let newIncome = this.state.inputIncome;
    let newHousing = this.state.inputHousing;
    let newTransport = this.state.inputTransport;
    let newFood = this.state.inputFood;
    let newOther = this.state.inputOther;
    let newIncomeType = this.state.incomeType;
    this.setState({
      income: newIncome,
      incomeType: newIncomeType,
      housing: newHousing,
      transport: newTransport,
      food: newFood,
      other: newOther
    });
    fetch("/setUpFixed", {
      method: "POST",
      body: JSON.stringify({
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
      })
    })
      .then(response => response.text())
      .then(response => {
        let parsed = JSON.parse(response);
        console.log(parsed.todaysBudget);
        this.props.sendTodaysBudgetToApp(parsed.todaysBudget);
        this.props.history.push("/getSavingsStatus");
      });
  };

  handleIncomeChange = event => {
    this.setState({ inputIncome: event.target.value });
  };
  handleHousingChange = event => {
    this.setState({ inputHousing: event.target.value });
  };
  handleTransportChange = event => {
    this.setState({ inputTransport: event.target.value });
  };
  handleFoodChange = event => {
    this.setState({ inputFood: event.target.value });
  };
  handleOtherChange = event => {
    this.setState({ inputOther: event.target.value });
  };

  handleIncomeType(event) {
    this.setState({ incomeType: event.target.value });
  }

  render() {
    return (
      <div className='login-container'>
        <h2 className="fixed-item">Income and Fixed Monthly Expenses</h2>

        <FormControl>
          <InputLabel>Income Period</InputLabel>
          <Select
            value={this.state.incomeType}
            onChange={this.handleIncomeType}
          >
            <MenuItem value="biweekly">Bi-weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>

        <Expense
          value={this.state.inputIncome}
          onChange={this.handleIncomeChange}
          label={"Personal income"}
        />

        <Expense
          value={this.state.inputHousing}
          onChange={this.handleHousingChange}
          label={"Housing expense"}
        />

        <Expense
          value={this.state.inputTransport}
          onChange={this.handleTransportChange}
          label={"Transport expense"}
        />

        <Expense
          value={this.state.inputFood}
          onChange={this.handleFoodChange}
          label={"Food expense"}
        />

        <Expense
          value={this.state.inputOther}
          onChange={this.handleOtherChange}
          label={"Other expense"}
        />
        <div className="fixed-item">  
          <SubmitButton onClick={this.handleSubmit} />
        </div>  
      </div>
    );
  }
}

let FixedInputs = withRouter(FixedInputsBasic);
export default FixedInputs;
