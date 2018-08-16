import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class SavingsStatusBasic extends Component {
    constructor() {
        super();
        this.state = {
            savingsToDate: null
        }
         
    }
    componentDidMount(){
        console.log("component did mount")
        fetch('/getSavingsStatus?userID=' + this.props.userID)
            .then(response => response.text())
            .then(responseText => {
                console.log(responseText);
                // turns into an object
                let parsed = JSON.parse(responseText);
                console.log(parsed);
                this.setState({
                    savingsToDate: parsed.savingsToDate
                })

            })
        }


    render(){
        let percentage = (this.state.savingsToDate/250)*100
        return (
        <div>
            <h2>Goal Progress</h2>
            <div class="progressbar">
                <div class="progressbarred" style={{width:percentage+"%"}}></div>
            </div>
            <h3>Daily Budget</h3>
            <h3>SaVING mETRIC</h3>
            <Link to="/login" class="container">
                <button>Submit Expense</button>
            </Link>
            <Link to="/login" class="container">
                <button>End Day</button>
            </Link>
        </div>
        )
    }
}

let SavingsStatus = withRouter(SavingsStatusBasic)
export default SavingsStatus;