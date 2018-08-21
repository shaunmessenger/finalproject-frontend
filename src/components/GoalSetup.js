import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputGoalAmount from "./MaterialUI/GoalsInputAmount";
import InputGoalDate from "./MaterialUI/GoalsInputDate";
import GoalsSubmitButton from "./MaterialUI/GoalsSubmitButton";
import UnrealisticGoalSubmitButton from "./MaterialUI/UnrealisticGoalSubmitButton";

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
      <div className="login-container">
        <form>
          <h2>Define your #Goals</h2>
          {/* Jordan did this component in-line, since sending props would have been difficult */}
          <FormControl>
            <InputLabel/>
            <Select value={this.state.goalType} onChange={this.newGoalType}>
              <MenuItem value="vacation">Vacation</MenuItem>
              <MenuItem value="newCar">New car</MenuItem>
              <MenuItem value="buyAHouse">Buy a house</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <br />
          <InputGoalAmount
            value={this.state.goalValue}
            onChange={this.newGoalValue}
          />
          <br />
          <InputGoalDate
            value={this.state.goalDate}
            onChange={this.newGoalDate}
          />
          <br />
          <GoalsSubmitButton onClick={this.handleSubmit} />
        </form>
        <p>
          {this.state.unrealistic ? (
            <div className="login-failed">
              A daily savings goal of ${this.state.dailySaveGoal + " "}
              might not be realistic. Modify your goal, or click to continue.
              <UnrealisticGoalSubmitButton onClick={this.renderFixedInput}>
                Continue
              </UnrealisticGoalSubmitButton>
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
