import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class SubmitButton extends Component {

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.props.onClick}>
          Submit
        </Button>
      </div>
    );
  }
}

export default SubmitButton;
