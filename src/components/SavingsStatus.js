import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import vacation from "../images/travel.png";
import car from "../images/car.png";
import house from "../images/house.png";
import other from "../images/other.png";
import AlertDialogSlide from "./PopUp";
import EndofDayButton from "./MaterialUI/GSSEndofDayButton";
import ExpenseSubmitButton from "./MaterialUI/GSSSubmitButton";
import "../App.css";

const divStyle = {
  marginBottom: "15px",
  marginTop: "15px",
  textAlign: "center"
};

class SavingsStatusBasic extends Component {
  constructor() {
    super();
    this.state = {
      savingsToDate: 0,
      open: true
    };
    this.handleClose = this.handleClose.bind(this);
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

  handleClose() {
    this.props.toggleFlag();
    this.setState({ open: false });
  }

  render() {
    let percentage = (this.state.savingsToDate / this.state.goalAmount) * 100;
    if (isNaN(percentage)) {
      percentage = 0;
    }
    if (percentage > 100) {
      percentage = 100;
    }

    let images = {
      vacation: vacation,
      newCar: car,
      buyAHouse: house,
      other: other
    };

    let text;
    if (percentage > 21 && percentage < 29) {
      text = "Almost a quarter of the way there! Keep it up!";
    } else if (percentage > 46 && percentage < 54) {
      text = "Halfway there! You're doing great!";
    } else if (percentage > 71 && percentage < 79) {
      text = "So close! You're within reach of your goal.";
    } else if (percentage === 100) {
      text = "YOU MADE IT!";
    } else {
      text = undefined;
    }
    return (
      <div className="status-container">
        {this.props.receivedAlert ? null : text ? (
          <AlertDialogSlide
            open={this.state.open}
            handleClose={this.handleClose}
            text={text}
          />
        ) : null}

        <h2 className="h2title">Goal Progress</h2>
        <div
          className="mainPageWithoutButtons"
          style={{
            backgroundImage: "url(" + images[this.state.goalType] + ")"
          }}
        >
          <div className="todays-budget">Today's Budget ${this.state.todaysBudget}</div>
        </div>
        <div className="progressbar">
          <div
            className="progressbarred"
            style={{ opacity: 0.8, width: percentage + "%" }}
          />
        </div>
        <div style={divStyle}>{parseInt(percentage)}% of goal reached</div>
        <div className="buttoncontainer">
          <Link to="/inputVariable">
            <ExpenseSubmitButton>RecordExpense</ExpenseSubmitButton>
          </Link>
          <Link to="/endOfDay">
            <EndofDayButton />
          </Link>
        </div>
      </div>
    );
  }
}

let SavingsStatus = withRouter(SavingsStatusBasic);
export default SavingsStatus;
