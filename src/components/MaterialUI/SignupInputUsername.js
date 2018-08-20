import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class InputUsername extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <TextField
          type="text"
          className="validate"
          placeholder="username"
          id="username-input"
          label="Username"
          margin="normal"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
export default InputUsername;
