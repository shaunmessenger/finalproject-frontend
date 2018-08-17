import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import vacation from '../images/travel.png'
import car from '../images/car.png'
import house from '../images/house.png'
import other from '../images/other.png'

class SavingsStatusBasic extends Component {
   constructor() {
       super();
       this.state = {
           savingsToDate: 0
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
                   todaysBudget: parsed.todaysBudget,
                   savingsToDate: parsed.savingsToDate,
                   goalAmount: parsed.goalAmount,
                   goalType: parsed.goalType
               })

           })
       }


   render(){
       let percentage = (this.state.savingsToDate/this.state.goalAmount)*100
       if (isNaN(percentage)){
           percentage = 0
       }
       if (percentage > 100){
           percentage = 100
       }

       let images={
           vacation: vacation,
           newCar: car,
           buyAHouse: house,
           other: other

       }
       return (
           <div>
       <div className="mainPageWithoutButtons" style={{backgroundImage: "url(" +images[this.state.goalType] +")" }}>
           <h2>Goal Progress</h2>
           <div class="progressbar">
               <div class="progressbarred" style={{width:percentage+"%"}}></div>
           </div>
           <h3>Daily Budget ${this.state.todaysBudget}</h3>
           <h3>{percentage}% of goal reached</h3>
           </div>
           <div>
           <Link to="/inputVariable" class="container">
               <button>Submit Expense</button>
           </Link>
           <Link to="/endOfDay" class="container">
               <button>End Day</button>
           </Link>
           </div>
       </div>
       )
   }
}

let SavingsStatus = withRouter(SavingsStatusBasic)
export default SavingsStatus;