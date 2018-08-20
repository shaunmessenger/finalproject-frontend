import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import vacation from "../images/travel.png";
import car from "../images/car.png";
import house from "../images/house.png";
import other from "../images/other.png";
import AlertDialogSlide from './PopUp';

class SavingsStatusBasic extends Component {
    constructor() {
        super();
        this.state = {
            savingsToDate: 0,
            open: true
        }
        this.handleClose = this.handleClose.bind(this)
    }
    componentDidMount() {
        console.log("component did mount");
        fetch("/getSavingsStatus?userID=" + this.props.userID)
            .then(response => response.text())
            .then(responseText => {
                console.log(responseText);
                // turns into an object
                let parsed = JSON.parse(responseText);
                console.log(parsed);
                this.setState({
                    todaysBudget: parsed.todaysBudget,
                    savingsToDate: parsed.savingsToDate,
                    goalAmount: parsed.goalAmount,
                    goalType: parsed.goalType
                });
            });
    }

    handleClose(){
        this.setState({ open: false })
    }

    render() {
        let percentage = (this.state.savingsToDate / this.state.goalAmount) * 100
        if (isNaN(percentage)) {
            percentage = 0
        }
        if (percentage > 100) {
            percentage = 100
        }

        let images = {
            vacation: vacation,
            newCar: car,
            buyAHouse: house,
            other: other

        }

        let text;
        return (
            <div>
                <AlertDialogSlide open={this.state.open} handleClose={this.handleClose} text={"welcome"}/>
                <div className="mainPageWithoutButtons" style={{ backgroundImage: "url(" + images[this.state.goalType] + ")" }}>
                    <div>Goal Progress</div>
                    <div className="progressbar">
                        <div className="progressbarred" style={{opacity:0.8,  width: percentage + "%" }}></div>
                    </div>
                    <div>Daily Budget ${this.state.todaysBudget}</div>
                    <div>{parseInt(percentage)}% of goal reached</div>
                </div>
                <div className="buttons">
                    <Link to="/inputVariable" className="container">
                        <button>Submit Expense</button>
                    </Link>
                    <Link to="/endOfDay" className="container">
                        <button>End Of Day</button>
                    </Link>
                </div>
            </div>
        )
    }
}

let SavingsStatus = withRouter(SavingsStatusBasic);
export default SavingsStatus;
