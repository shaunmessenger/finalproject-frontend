import React, { Component } from 'react';
import DailyBudget from './DailyBudget.js'
var moment = require ('moment');

class WeekContainer extends Component {
    constructor() {
        super();
        this.state = {
            currentDate: ''
        }
        
    }
    
    
    render(){
        return (
        <div>    
            <div>   
                Week of: {moment().startOf('week').format('ddd D MMM')} to {moment().startOf('week').add(6, 'days').format('ddd D MMM')}
            </div>
            <div>
                <DailyBudget day = {moment().startOf('week').format('ddd D MMM')} budget = {this.props.todaysBudget} spent ={this.props.todaysVariable}/>
                <DailyBudget day = {moment().startOf('week').add(1, 'days').format('ddd D MMM')} budget = {this.props.todaysBudget} spent ={this.props.todaysVariable}/>
                <DailyBudget day = {moment().startOf('week').add(2, 'days').format('ddd D MMM')} budget = {this.props.todaysBudget} spent ={this.props.todaysVariable}/>
                <DailyBudget day = {moment().startOf('week').add(3, 'days').format('ddd D MMM')} budget = {this.props.todaysBudget} spent ={this.props.todaysVariable}/>
                <DailyBudget day = {moment().startOf('week').add(4, 'days').format('ddd D MMM')} budget = {this.props.todaysBudget} spent ={this.props.todaysVariable}/>
                <DailyBudget day = {moment().startOf('week').add(5, 'days').format('ddd D MMM')} budget = {this.props.todaysBudget} spent ={this.props.todaysVariable}/>
                <DailyBudget day = {moment().startOf('week').add(6, 'days').format('ddd D MMM')} budget = {this.props.todaysBudget} spent ={this.props.todaysVariable}/>
            </div>
        </div>    
        )    
    }
}

export default WeekContainer;


