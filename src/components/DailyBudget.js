import React, { Component } from 'react';
import '../App.css'
import { RadialChart } from 'react-vis';

class DailyBudget extends Component {
    constructor() {
        super()
        this.state = {
            budget: 0,
            spent: 0
        }

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
    render() {
        let date = this.props.day
        let numbersOnly = parseInt(date.replace(/[^0-9]/g, ""))
        // console.log(typeof(numbersOnly))
        let today = new Date()
        let todaysDate = today.getDate()
        // console.log(typeof(todaysDate))
        return (
            <div className="day-budget">
                <div>
                    {(this.props.day)}
                    <br/>
                </div>


                {
                    (todaysDate === numbersOnly) ?

                        <div className="day-budget-item">
                           
                                Budget: ${this.props.todaysBudget + this.props.todaysVariable + " "}
                                Spent: ${this.props.todaysVariable}
                                <div><RadialChart 
                                                data={[{angle:this.props.todaysVariable, className:"exp-spent"}, {angle:this.props.todaysBudget, className:"exp-budget"}]}
                                                height={55}
                                                width={55}
                                                radius={20}
                                                innerRadius={10}
                                                   />
                                </div>
                            
                        </div> :
                        <div className="day-budget-item">
                            
                                Budget: ${this.state.budget + " "}
                                Spent: ${this.state.spent}
                                <div className="exp-inactive"><RadialChart 
                                                data={[{angle:this.state.spent}, {angle:this.state.budget - this.state.spent}]}
                                                height={55}
                                                width={55}
                                                radius={20}
                                                innerRadius={10}
                                                   />
                                </div>
                        </div>
                }

            </div>
        )
    }
}


export default DailyBudget;