import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ExpenseChart from "./PieChart";
import data from "./mockdata.js";

class AnalyticsPageBasic extends Component {
  render() {
    return (
      <div>
        <h2>Your Spending Breakdown</h2>
        <ExpenseChart data={data} />
      </div>
    );
  }
}

let AnalyticsPage = withRouter(AnalyticsPageBasic);
export default AnalyticsPage;
