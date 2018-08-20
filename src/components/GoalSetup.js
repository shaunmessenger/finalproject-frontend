import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import GoalTypeSelector from "./MaterialUI/GoalsTypeSelector";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

class GoalSetupForm extends Component {
  constructor() {
    super();
    this.state = {
      goalValue: null,
      goalDate: "",
      goalType: "vacation"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newGoalDate = this.newGoalDate.bind(this);
    this.newGoalValue = this.newGoalValue.bind(this);
    this.newGoalType = this.newGoalType.bind(this);
    this.renderFixedInput = this.renderFixedInput.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    //check for missing input
    let bod = JSON.stringify({
      userID: this.props.userID,
      goal: {
        amount: this.state.goalValue,
        endDate: this.state.goalDate,
        type: this.state.goalType
      }
    });
    console.log(bod);
    fetch("/setUpGoal", {
      method: "POST",
      body: bod
    })
      .then(response => response.text())
      .then(response => {
        let parsed = JSON.parse(response);
        console.log(parsed);
        if (parsed.unrealistic) {
          this.setState({
            unrealistic: true,
            dailySaveGoal: parsed.dailySaveGoal
          });
        } else {
          this.setState({ dailySaveGoal: parsed.dailySaveGoal });
          this.props.sendSaveGoalToApp(parsed.dailySaveGoal);
          if (parsed.mustMakeFixedProfile) {
            this.props.history.push("/setUpFixed");
          } else {
            this.props.history.push("/getSavingsStatus");
          }
        }
      });
  }

  newGoalValue(evt) {
    this.setState({ goalValue: evt.target.value });
  }

  newGoalDate(evt) {
    this.setState({ goalDate: evt.target.value });
  }
  newGoalType(evt) {
    this.setState({ goalType: evt.target.value });
  }
  renderFixedInput() {
    this.props.sendSaveGoalToApp(this.state.dailySaveGoal);
    this.props.history.push("/setUpFixed");
  }

  render() {
    return (
      <div className='login-container'>
        <form onSubmit={this.handleSubmit}>
          <h2>Define your Goals</h2>
          <form>
            <FormControl>
              <InputLabel>Age</InputLabel>
              <Select
                value={this.state.goalType}
                onChange={this.newGoalType}
                inputProps={{
                  name: "age",
                  id: "age-simple"
                }}
              >
                <MenuItem value={"vacation"}>Vaction</MenuItem>
                <MenuItem value={"newCar"}>New Car</MenuItem>
                <MenuItem value={"buyAHouse"}>Buy a house</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </form>
          <div className='goal-container'>

            <div className='inputs-on-goalpage'>
              <input
                placeholder="Goal Amount"
                value={this.state.goalValue}
                onChange={this.newGoalValue}
              />
            </div>
            <div className='inputs-on-goalpage'>
              <input
                placeholder="MM/DD/YYYY"
                value={this.state.goalDate}
                onChange={this.newGoalDate}
              />
            </div>
            <div className='inputs-on-goalpage'>
              <input type="submit" />
              </div>
              </div>
          </form>
          
          <p>
            {this.state.unrealistic ? (
              <div>
                A daily savings goal of ${this.state.dailySaveGoal}
                might not be realistic. Modify your goal, or click
              <button onClick={this.renderFixedInput}>here</button>
                to continue
            </div>
            ) : null}
          </p>
        </div>
    );
  }
}

let GoalSetup = withRouter(GoalSetupForm);
export default GoalSetup;

//Jainal 15/7/2018
