import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class InputUsername extends Component {

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
