import React, { Component } from 'react';
import DailyBudget from './DailyBudget.js';
var moment = require ('moment');


class Throwaway extends Component {
    constructor() {
        super();
        this.state = {
            currentDate: ''
        }
        // this.getDay = this.getDay.bind(this)
    }
    // componentDidMount(){}



    newDate() {
        return moment();
       
    }

    render(){
        return <div>
                    <DailyBudget day = {this.newDate()}/>
                    <DailyBudget day = {this.newDate() + 1}/>
                    <DailyBudget day = {this.newDate() + 2}/>
                    <DailyBudget day = {this.newDate() + 3}/>
                    <DailyBudget day = {this.newDate() + 4}/>
                    <DailyBudget day = {this.newDate() + 5}/>
                    <DailyBudget day = {this.newDate() + 6}/>


                </div>    
    }
}

export default Throwaway;
