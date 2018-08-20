import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

class HousingExpense extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <TextField
          type="select-currency-native"
          className="goalamount"
          placeholder="$"
          id="select-currency-native"
          label="Housing Expense"
          margin="normal"
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default HousingExpense;
