import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class InputAmount extends Component {
  constructor(props) {
    super(props);
  }
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
