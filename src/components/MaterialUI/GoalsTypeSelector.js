import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

class GoalTypeSelector extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form autoComplete="off">
        <FormControl>
          <InputLabel>Age</InputLabel>
          <Select
            value={this.state.goalType}
            onChange={this.newGoalType}
            inputProps={{
              name: "age",
              id: "age-simple"
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default GoalTypeSelector;
