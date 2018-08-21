import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Breakdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //userID: this.props.userID,
            userID: 7195,
            //date: this.props.date,
            date: "21 Aug 2018"
        }
    }




    fetch() {
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
                let totalCoffee;
                let totalOther;
                let totalFood;
                let totalShopping;
                let totalTransport;
                for (let i = 0; i < parsed.length; i++) {
                    if (parsed.type === "coffee") {
                        totalCoffee += parseFloat(parsed.amount)
                    } else if (parsed.type === "food") {
                        totalFood += parseFloat(parsed.amount)
                    } else if (parsed.type === "transport") {
                        totalTransport += parseFloat(parsed.amount)
                    } else if (parsed.type === "shopping") {
                        totalShopping += parseFloat(parsed.amount)
                    } else {
                        totalOther += parseFloat(parsed.amount)
                    }
                })
    }
}

    render() {
        return ()
    }



}
export default Breakdown