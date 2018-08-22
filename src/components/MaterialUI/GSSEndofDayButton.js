import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../../App.css";

class EndofDayButton extends Component {
  render() {
    return (
      <Button style={{ minWidth: "150px" }} variant="contained">
        End Day
      </Button>
    );
  }
}

export default EndofDayButton;
