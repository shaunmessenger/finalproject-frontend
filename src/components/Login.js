import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginButton from "./MaterialUI/LoginButton";
import InputPassword from "./MaterialUI/LoginInputPassword";
import InputUsername from "./MaterialUI/LoginInputUsername";
import SubmitButton from "./MaterialUI/SubmitButton";
import "../App.css";

class LoginBasic extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      inputUsername: "",
      inputPassword: "",
      loginFailed: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let newUsername = this.state.inputUsername;
    let newPassword = this.state.inputPassword;
    this.setState({
      username: newUsername,
      password: newPassword
    });
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: newUsername,
        password: newPassword
      })
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ loginFailed: json.loginFailed });

        if (json.loginFailed) {
          console.log("you failed");
        } else if (json.mustMakeGoalProfile) {
          this.setState({
            userID: json.userID
          });
          this.props.sendUserIDToApp(json.userID);
          this.props.history.push("/setUpGoal");
        } else if (json.mustMakeFixedProfile) {
          this.setState({
            userID: json.userID,
            dailySaveGoal: json.dailySaveGoal
          });
          this.props.sendSaveGoalToApp(json.dailySaveGoal);
          this.props.sendUserIDToApp(json.userID);
          this.props.history.push("/setUpFixed");
        } else {
          this.setState({
            userID: json.userID,
            dailySaveGoal: json.dailySaveGoal
          });
          this.props.sendUserIDToApp(json.userID);
          this.props.sendSaveGoalToApp(json.dailySaveGoal);
          this.props.sendTodaysBudgetToApp(json.todaysBudget);
          this.props.sendTodaysVariableToApp(json.todaysVariable);
          this.props.history.push("/getSavingsStatus");
        }
      });
  };
  handleUsernameChange = event => {
    this.setState({ inputUsername: event.target.value });
  };

  handlePasswordChange = event => {
    // NOTE: event.target.value is not exatly the same as the value in 'input'
    this.setState({ inputPassword: event.target.value });
  };
  linkToSignup = event => {
    this.props.history.push("/Signup");
  };

  render() {
    return (
      <div className='login-container'>
        <form onSubmit={this.handleSubmit}>
          <h2 className="login-title">Login</h2>
          <InputUsername
            value={this.state.inputUsername}
            onChange={this.handleUsernameChange}
          />
          <InputPassword
            value={this.state.inputPassword}
            onChange={this.handlePasswordChange}
          />
        <div className='buttons-at-login'>
          <SubmitButton onClick={this.handleSubmit} />
          
          <LoginButton onClick={this.linkToSignup}>New User?</LoginButton>
       </div>
       </form>
        <div className='login-failed'>{this.state.loginFailed ? "Login failed, try again" : null}</div>
      </div>
    );
  }
}
let Login = withRouter(LoginBasic);
export default Login;
