import React, { Component } from 'react';
import DailyBudget from './DailyBudget.js'
var moment = require('moment');

class WeekContainer extends Component {
    constructor() {
        super();
        this.state = {
            currentDate: ''
        }

    }


    render() {

        return (
            <div>
                <div>
                    Week of: {moment().startOf('week').format('ddd D MMM')} to {moment().startOf('week').add(6, 'days').format('ddd D MMM')}
                </div>
                <div>
                    <DailyBudget userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').format('ddd D MMM')} />
                    <DailyBudget userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(1, 'days').format('ddd D MMM')} />
                    <DailyBudget userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(2, 'days').format('ddd D MMM')} />
                    <DailyBudget userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(3, 'days').format('ddd D MMM')} />
                    <DailyBudget userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(4, 'days').format('ddd D MMM')} />
                    <DailyBudget userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(5, 'days').format('ddd D MMM')} />
                    <DailyBudget userID={this.props.userID} todaysBudget={this.props.todaysBudget} todaysVariable={this.props.todaysVariable} day={moment().startOf('week').add(6, 'days').format('ddd D MMM')} />
                </div>
            </div>
        )
    }
}

export default WeekContainer;


