import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class UnrealisticGoalsSubmitButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.props.onClick}>
          Continue
        </Button>
      </div>
    );
  }
}

export default UnrealisticGoalsSubmitButton;