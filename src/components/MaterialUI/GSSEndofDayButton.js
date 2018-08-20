import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class EndofDayButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Button variant="contained"> Submit Expense</Button>;
  }
}

export default EndofDayButton;
