import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class SubmitButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Button variant="contained">Expense</Button>;
  }
}

export default SubmitButton;
