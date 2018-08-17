import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';




class EndOfDayForm extends Component {
    constructor() {
        super();
        this.state = {
            daySavings: null,
            dayRollover: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSavings = this.handleSavings.bind(this)
        this.handleRollover = this.handleRollover.bind(this)

    }

    handleSubmit(evt) {
        evt.preventDefault();

        let bod;
        (this.props.todaysBudget > 0) ?
            bod = JSON.stringify({
                userID: this.props.userID,
                savedAmount: this.state.daySavings,
                rolloverAmount: this.state.dayRollover
            })
            :

            bod = JSON.stringify({
                userID: this.props.userID,
                savedAmount: 0,
                rolloverAmount: this.props.todaysBudget
            })

        console.log(bod)
        fetch('/endOfDay', {
            method: 'POST',
            body: bod
        })
            .then(response => response.text())
            .then(response => {
                let parsed = JSON.parse(response)
                console.log(parsed)
                let todaysBudget = parsed.todaysBudget
                let todaysVariable = parsed.todaysVariable
                this.props.sendInfoToApp(todaysBudget, todaysVariable)

                this.props.history.push('/getSavingsStatus')
            })
    }

    handleSavings(evt) {
        this.setState({ daySavings: evt.target.value })
    }
    handleRollover(evt) {
        this.setState({ dayRollover: evt.target.value })
    }


    render() {
        return (


            <div>
                {(this.props.todaysBudget > 0) ?

                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <h2>Done for the day?</h2>
                            Add to savings:
                <input placeholder={'$' + this.props.dailySaveGoal}
                                value={this.state.daySavings}
                                onChange={this.handleSavings} />
                            Rollover to tomorrow:
                <input placeholder={'$' + (this.props.todaysBudget - this.state.daySavings)}
                                value={this.state.dayRollover}
                                onChange={this.handleRollover} />
                            <div>Your savings goal for today: ${this.props.dailySaveGoal}</div>
                            <div>Budget remaining: ${this.props.todaysBudget}</div>
                            <input type="submit" />
                        </form>
                    </div> :


                    <div>
                        <form onSubmit={this.handleSubmit}>you over spent today
                <input type='submit' value="go back"/>
                        </form>
                    </div>


                }


            </div>
        )


    }
}

let EndOfDay = withRouter(EndOfDayForm)
export default EndOfDay;

//jainal 16/8/2018