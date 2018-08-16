import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup.js';
import GoalSetup from './components/GoalSetup.js';
import FixedInputs from './components/FixedInputs.js';
import VariableExpense from './components/VariableExpense.js';
import SavingsStatus from './components/SavingsStatus.js';
import DailyBudget from './components/DailyBudget.js';
import EndOfDay from './components/EndOfDay.js';

class App extends Component {
  constructor() {
    super();
    this.state={
      userID: null
    }
    this.getUserIdFromLogin = this.getUserIdFromLogin.bind(this)
  }
  getUserIdFromLogin (userID)  {
    this.setState({userID: userID})//this code is sending the userID to the components where needed
  }
  render() {
    return (
      <BrowserRouter>
        <div>
        <Route path = '/' exact ={true} render ={() => <Login sendUserIDToApp ={this.getUserIdFromLogin}/>} />
        <Route path = '/Signup' exact ={true} render ={() => <Signup/>} />
        <Route path = '/setUpGoal' exact ={true} render ={() => <GoalSetup userID = {this.state.userID}/>} />
        <Route path = '/setUpFixed' exact ={true} render ={() => <FixedInputs userID = {this.state.userID}/>} />
        <Route path = '/inputVariable' exact ={true} render ={() => <VariableExpense userID = {this.state.userID}/>} />
        <Route path = '/getSavingsStatus' exact ={true} render ={() => <SavingsStatus userID = {this.state.userID}/>} />
        <Route path = '/todaysBudget' exact ={true} render ={() => <DailyBudget/>} />
<<<<<<< HEAD
        <Route path = '/endOfDay' exact ={true} render ={() => <EndOfDay userID = {this.state.userID}/>} />

=======
        <Route path = '/endOfDay' exact ={true} render ={() => <EndOfDay/>} />
>>>>>>> 050df2f2e00494ab0a13206d746c2ce15aa155fc
        </div>      
      </BrowserRouter>  
      
    );
  }
}

export default App;
