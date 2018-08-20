import React, { Component } from 'react';



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
            <div>
                <div>
                    {(this.props.day)}
                </div>


                {
                    (todaysDate === numbersOnly) ?

                        <div>
                            <div>
                                Budget: {this.props.budget}
                            </div>
                            <div>
                                Spent: {this.props.spent}
                            </div></div> :
                        <div>
                            <div>
                                Budget: {this.state.budget}
                            </div>
                            <div>
                                Spent: {this.state.spent}
                            </div>
                        </div>
                }

            </div>
        )
    }
}


export default DailyBudget;