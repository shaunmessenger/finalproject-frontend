import React, { Component } from 'react';




class DailyBudget extends Component {
    // constructor() {
    //     super();
    
    //     this.state = {
    //         todaysBudget: null,
    //         todaysVariable: null,
    //     }
        
    // }
    renderDay(dayNum){
        if (dayNum >= 7) {
            dayNum = dayNum - 7
        }
        if (dayNum === 0) {
            return "SUN"
        }
        if (dayNum === 1) {
            return "MON"
        }
        if (dayNum === 2) {
            return "TUE"
        }
        if (dayNum === 3) {
            return "WED"
        }
        if (dayNum === 4) {
            return "THU"
        }
        if (dayNum === 5) {
            return "FRI"
        }
        if (dayNum === 6) {
            return "SAT"
        }
        
    }

   /*  componentDidMount(){
        console.log("component did mount")
        fetch('/todaysBudget' + this.props.userID)
        .then(response => response.text())
        .then(response => {
            console.log(response);
            let parsed = JSON.parse(response);
            console.log(parsed);
            this.setState({
                todaysBudget: parsed.todaysBudget,
                spent: parsed.todaysVariable

            })
        })
    } */

 

    render(){
        return (
        <div>
            <div>
                {(this.props.day)}
            </div>
            <div>
                Budget: {this.props.budget}
            </div>
            <div>
                Spent: {this.props.spent}
            </div>
        </div>
        )
    }
}


export default DailyBudget;