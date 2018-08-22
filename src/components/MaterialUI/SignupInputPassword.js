import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class InputPassword extends Component {

  render() {
    return (
      <div>
        <TextField
          type="password"
          className="validate"
          placeholder="password"
          id="password-input"
          label="Password"
          autoComplete="current-password"
          margin="normal"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default InputPassword;
