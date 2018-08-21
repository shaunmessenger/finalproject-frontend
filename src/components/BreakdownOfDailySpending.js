import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class BreakdownBasic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //userID: this.props.userID,
            userID: 7195,
            //date: this.props.date,
            date: "Tue 21 Aug 2018",
            totalCoffee: 0,
            totalFood: 0,
            totalOther: 0,
            totalShopping: 0,
            totalTransport: 0
        }
    }


    

    componentDidMount() {
        fetch("/getDaysAnalytics", {
            method: "POST",
            body: JSON.stringify({
                userID: this.state.userID,
                date: this.state.date
            })
        })
        .then(response => response.text())
        .then(response => {
            let parsed = JSON.parse(response)
            console.log(parsed)

            for (let i = 0; i < parsed.length; i++) {
                if (parsed[i].type === "coffee") {
                    this.setState({totalCoffee: this.state.totalCoffee + parseFloat(parsed[i].amount)})
                } else if (parsed[i].type === "food") {
                    this.setState({totalFood: this.state.totalFood + parseFloat(parsed[i].amount)})
                } else if (parsed[i].type === "transport") {
                    this.setState({totalTransport: this.state.totalTransport + parseFloat(parsed[i].amount)})
                } else if (parsed[i].type === "shopping") {
                    this.setState({totalShopping: this.state.totalShopping + parseFloat(parsed[i].amount)})
                } else {
                    this.setState({totalOther: this.state.totalOther + parseFloat(parsed[i].amount)})
                }
            }
        })
    }

    render() {
        return (
            <div>{this.state.totalTransport}</div>
        )
    }



}

let Breakdown = withRouter(BreakdownBasic)
export default Breakdown;