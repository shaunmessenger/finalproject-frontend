import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../../App.css";

class LoginButton extends Component {

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.props.onClick}>
          New User?
        </Button>
      </div>
    );
  }
}

export default LoginButton;
