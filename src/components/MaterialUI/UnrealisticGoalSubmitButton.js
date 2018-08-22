import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class UnrealisticGoalsSubmitButton extends Component {

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