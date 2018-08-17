import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import MenuAppBar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import GoalSetup from './components/GoalSetup';
import FixedInputs from './components/FixedInputs';
import VariableExpense from './components/VariableExpense';
import SavingsStatus from './components/SavingsStatus';
import WeekContainer from './components/WeekContainer.js';
import EndOfDay from './components/EndOfDay';

class App extends Component {
  constructor() {
    super();
    this.state={
      userID: null,
      dailySaveGoal: null
      
    }
    this.getUserIdFromLogin = this.getUserIdFromLogin.bind(this)
    this.getSaveGoalfromGoalSetup = this.getSaveGoalfromGoalSetup.bind(this)
    this.getSaveGoalFromLogin = this.getSaveGoalFromLogin.bind(this)
    this.getTodaysBudgetFromLogin = this.getTodaysBudgetFromLogin.bind(this)
    this.getTodaysBudgetFromFixedSetup = this.getTodaysBudgetFromFixedSetup.bind(this)
    this.getBudgetAndVarFromInputExp = this.getBudgetAndVarFromInputExp.bind(this)
    this.getTodaysVariableFromLogin = this.getTodaysVariableFromLogin.bind(this)
    this.clearStateFromLogout = this.clearStateFromLogout.bind(this)
  }
  getUserIdFromLogin (userID)  {
    this.setState({userID: userID})//sending the userID to the components where needed
  }
  getSaveGoalfromGoalSetup(dailySaveGoal){
    this.setState({dailySaveGoal: dailySaveGoal})//sending the dailySaveGoal to end of day
  }
  getSaveGoalFromLogin(dailySaveGoal){
    this.setState({dailySaveGoal: dailySaveGoal})
  }
  getTodaysBudgetFromLogin(todaysBudget){
    this.setState({todaysBudget: todaysBudget})
  }
  getTodaysBudgetFromFixedSetup(todaysBudget){
    this.setState({todaysBudget: todaysBudget})
  }
  getBudgetAndVarFromInputExp(budget, spent){
    this.setState({todaysBudget: budget, todaysVariable: spent})
  }
  getTodaysVariableFromLogin(todaysVar){
    this.setState({todaysVariable: todaysVar})
  }
  clearStateFromLogout(){
    this.setState({todaysBudget: 0, todaysVariable: 0, dailySaveGoal: 0, userID: 0})
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <MenuAppBar userID={this.state.userID} logout={this.clearStateFromLogout}/> 
        <Route path = '/' exact ={true} render ={() => 
          <Login sendUserIDToApp ={this.getUserIdFromLogin} 
                 sendSaveGoalToApp={this.getSaveGoalFromLogin} 
                 sendTodaysBudgetToApp={this.getTodaysBudgetFromLogin} 
                 sendTodaysVariableToApp={this.getTodaysVariableFromLogin}/>} 
          />
        <Route path = '/Signup' exact ={true} render ={() => <Signup/>} />

        <Route path = '/setUpGoal' exact ={true} render ={() => 
          <GoalSetup userID = {this.state.userID} 
                     sendSaveGoalToApp = {this.getSaveGoalfromGoalSetup}/>} 
          />
        <Route path = '/setUpFixed' exact ={true} render ={() => 
          <FixedInputs userID = {this.state.userID} 
                       sendTodaysBudgetToApp = {this.getTodaysBudgetFromFixedSetup}/>} 
          />
        <Route path = '/inputVariable' exact ={true} render ={() => 
            <VariableExpense userID = {this.state.userID} 
                             sendInfoToApp={this.getBudgetAndVarFromInputExp}/>} 
            />
        <Route path = '/getSavingsStatus' exact ={true} render ={() => 
          <SavingsStatus userID = {this.state.userID} 
                         todaysBudget={this.state.todaysBudget}/>} 
          />
        {/* <Route path = '/todaysBudget' exact ={true} render ={() => 
          <WeekContainer userID = {this.state.userID} 
                       todaysBudget={this.state.todaysBudget}
                       todaysVariable ={this.state.todaysVariable}/>}  */}
          {/* /> */}
        <Route path = '/endOfDay' exact ={true} render ={() => 
          <EndOfDay userID = {this.state.userID} 
                    dailySaveGoal = {this.state.dailySaveGoal} 
                    todaysBudget={this.state.todaysBudget} 
                    sendInfoToApp={this.getBudgetAndVarFromInputExp}/>} 
          />

        </div>      
      </BrowserRouter>  
      
    );
  }
}

export default App;
