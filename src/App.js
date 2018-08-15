import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup.js';
import GoalSetup from './components/GoalSetup.js';
import VariableExpense from './components/VariableExpense';
import SavingsStatus from './components/SavingsStatus';
import DailyBudget from './components/DailyBudget';
import EndOfDay from './components/EndOfDay';
import FixedInputs from './components/FixedInputs';


class App extends Component {
  constructor() {
    super();
    this.state={
      userID: null
    }
    this.getUserIdFromLogin = this.getUserIdFromLogin.bind(this)
  }
  getUserIdFromLogin (userID)  {
    this.setState({userID: userID})
  }
  render() {
    return (
      <BrowserRouter>
        <div>
    <Route path = '/' exact ={true} render ={() => <Login sendUserIDToApp ={this.getUserIdFromLogin}/>} />
        <Route path = '/Signup' exact ={true} render ={() => <Signup/>} />
        <Route path = '/setUpGoal' exact ={true} render ={() => <GoalSetup userID= {this.state.userID}/>} />
        <Route path = '/setUpFixed' exact ={true} render ={() => <FixedInputs/>} />
        <Route path = '/inputVariable' exact ={true} render ={() => <VariableExpense/>} />
        <Route path = '/getSavingsStatus' exact ={true} render ={() => <SavingsStatus/>} />
        <Route path = '/todaysBudget' exact ={true} render ={() => <DailyBudget/>} />
        <Route path = '/endOfDay' exact ={true} render ={() => <EndOfDay/>} />
        </div>      
      </BrowserRouter>  
      
    );
  }
}

export default App;
