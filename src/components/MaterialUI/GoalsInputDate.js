import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class InputGoalDate extends Component {

  render() {
    return (
      <div>
        <TextField
          type="text"
          className="goaldate"
          placeholder="MM/DD/YYYY"
          id="select-date-native"
          label="End Date"
          margin="normal"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default InputGoalDate;
