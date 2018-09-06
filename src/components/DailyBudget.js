import React, { Component } from 'react';
import '../App.css'
import { RadialChart } from 'react-vis';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

var moment = require('moment');

class DailyBudgetBasic extends Component {
    constructor() {
        super()
        this.state = {
            budget: 0,
            spent: 0
        }
        this.handleClickOtherDayBreakdown = this.handleClickOtherDayBreakdown.bind(this)

    }
    componentDidMount() {
        fetch('/getRecord', {
            method: "POST",
            body: JSON.stringify({
                userID: this.props.userID,
                date: this.props.day
            })
        }).then(response => response.text())
            .then(response => {
                let startOfDayBudget;
                let spent;
                console.log(response)
                let parsedResponse = JSON.parse(response)
                if (parsedResponse.startOfDayBudget) {
                    startOfDayBudget = parsedResponse.startOfDayBudget
                }
                else {
                    startOfDayBudget = 0;
                }

                if (parsedResponse.leftoverFromDay) {
                    spent = startOfDayBudget - parsedResponse.leftoverFromDay
                } else {
                    spent = 0
                }

                this.setState({ budget: startOfDayBudget, spent: spent })
            })
    }
    handleClickOtherDayBreakdown() {
        this.props.sendDate(this.props.day + " 2018")
        this.props.history.push('/analytics')
    }

    render() {
        let date = this.props.day
        let momentDate = moment(date, "DD MM YYYY")
        let numbersOnly = parseInt(date.replace(/[^0-9]/g, ""))
        let today = new Date()
        let isAfter = momentDate.isAfter(today)
        console.log(momentDate + " " + isAfter)
        let todaysDate = today.getDate()
        return (
            <div className="day-budget">
                {
                    //if today's date is the date today
                    (todaysDate === numbersOnly) ?
                        // then create this 
                        <div className="day-budget-item">
                            <div className="textinputs">
                                <div className="date">{(this.props.day)}</div>
                                <div>Budget: ${this.props.todaysBudget + this.props.todaysVariable + " "}</div>
                                <div>Spent: ${this.props.todaysVariable}</div>
                            </div>
                            <div className="chartandbutton">
                                {/* <RadialChart
                                    data={[{ angle: this.props.todaysVariable, className: "exp-spent" }, { angle: this.props.todaysBudget, className: "exp-budget" }]}
                                    height={55}
                                    width={55}
                                    radius={20}
                                    innerRadius={10}
                                /> */}
                                <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClickOtherDayBreakdown}>
                                    <AddIcon />
                                </Button>
                            </div>

                        </div>
                        :
                        // if not, create this
                        <div className="day-budget-item">
                            <div className="textinputs">
                                <div className="date">{(this.props.day)}</div>
                                <div>Budget: ${this.state.budget + " "}</div>
                                <div>Spent: ${this.state.spent}</div>
                            </div>
                            {
                                // if the date is after today 
                                (isAfter) ?
                                    null :




                                    <div className="chart-button">

                                        {/* <div className="exp-inactive"><RadialChart
                                            data={[{ angle: this.state.spent, className: "past-spent" }, { angle: this.state.budget - this.state.spent, className: "past-budget" }]}
                                            height={55}
                                            width={55}
                                            radius={20}
                                            innerRadius={10}
                                        />
                                        </div> */}
                                        <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClickOtherDayBreakdown}>
                                            <AddIcon />
                                        </Button>
                                    </div>
                            }
                        </div>
                }
            </div>

        )
    }
}

let DailyBudget = withRouter(DailyBudgetBasic)
export default DailyBudget;