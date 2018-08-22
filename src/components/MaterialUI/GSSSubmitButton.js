import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../../App.css";

class ExpenseSubmitButton extends Component {
  render() {
    return (
      <Button style={{ minWidth: "150px" }} variant="contained">
        Submit Expense
      </Button>
    );
  }
}

export default ExpenseSubmitButton;
