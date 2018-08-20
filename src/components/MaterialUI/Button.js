import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class LoginButton extends Component {
  render() {
    return (
      <div>
        <Button variant="contained">New User?</Button>
      </div>
    );
  }
}

export default LoginButton;
