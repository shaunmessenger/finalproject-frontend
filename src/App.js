import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route} from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import FixedInputs from './components/FixedInputs'
=======
import Login from './components/Login';
import Signup from './components/Signup.js';
import GoalSetup from './components/GoalSetup.js';
import FixedSetup from './components/FixedSetup.js';
import VariableExpense from './components/VariableExpense';
import SavingsStatus from './components/SavingsStatus';
import DailyBudget from './components/DailyBudget';
import EndOfDay from './components/EndOfDay';
>>>>>>> 68e9f554acaa2d3517e3540f14a6ebf51f0c1cdd

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
<<<<<<< HEAD
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <FixedInputs/>
      </div>
=======
      <BrowserRouter>
        <div>
    <Route path = '/' exact ={true} render ={() => <Login sendUserIDToApp ={this.getUserIdFromLogin}/>} />
        <Route path = '/Signup' exact ={true} render ={() => <Signup/>} />
        <Route path = '/setUpGoal' exact ={true} render ={() => <GoalSetup userID= {this.state.userID}/>} />
        <Route path = '/setUpFixed' exact ={true} render ={() => <FixedSetup/>} />
        <Route path = '/inputVariable' exact ={true} render ={() => <VariableExpense/>} />
        <Route path = '/getSavingsStatus' exact ={true} render ={() => <SavingsStatus/>} />
        <Route path = '/todaysBudget' exact ={true} render ={() => <DailyBudget/>} />
        <Route path = '/endOfDay' exact ={true} render ={() => <EndOfDay/>} />

        </div>      
      </BrowserRouter>  
      
>>>>>>> 68e9f554acaa2d3517e3540f14a6ebf51f0c1cdd
    );
  }
}

export default App;
