import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PieChart, Pie, Tooltip } from "recharts";

class BreakdownBasic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userID: this.props.userID,
            date: this.props.dateToSend,
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
                        this.setState({ totalCoffee: this.state.totalCoffee + parseFloat(parsed[i].amount) })
                    } else if (parsed[i].type === "food") {
                        this.setState({ totalFood: this.state.totalFood + parseFloat(parsed[i].amount) })
                    } else if (parsed[i].type === "transport") {
                        this.setState({ totalTransport: this.state.totalTransport + parseFloat(parsed[i].amount) })
                    } else if (parsed[i].type === "shopping") {
                        this.setState({ totalShopping: this.state.totalShopping + parseFloat(parsed[i].amount) })
                    } else {
                        this.setState({ totalOther: this.state.totalOther + parseFloat(parsed[i].amount) })
                    }
                }
            })
    }

    render() {
        let data = [{ name: "Coffee", value: this.state.totalCoffee, fill: '#76D7C4' },
        { name: "Transport", value: this.state.totalTransport, fill: '#7FB3D5' },
        { name: "Other", value: this.state.totalOther, fill: '#C39BD3'},
        { name: "Food", value: this.state.totalFood, fill: '#F7DC6F' },
        { name: "Shopping", value: this.state.totalShopping, fill: '#7DCEA0'}

        ]
        return (
            <div className='status-container'>

                <h2 className='h2title'>{this.state.date}</h2>
                <div className='piechart'>
                <PieChart width={400} height={250}>
                    <Pie
                        isAnimationActive={false}
                        data={data}
                        cx={200}
                        cy={100}
                        outerRadius={100}
                        fill={data.fill}
                        // label
                    />
                    <Tooltip />
                </PieChart>
        
                </div>
                <div className='signup-title'>Hover over each slice to see how much you've spent</div>
            </div>
        )
    }



}

let Breakdown = withRouter(BreakdownBasic)
export default Breakdown;