import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class SignupForm extends Component {
    constructor() {
        super();
        this.state ={
            username: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNewName = this.handleNewName.bind(this)
        this.handleNewPassword = this.handleNewPassword.bind(this)
        
    }

    handleSubmit(evt){
        evt.preventDefault();
        let bod = JSON.stringify({
            username: this.state.username, 
            password: this.state.password
        });
        
        fetch('./signup', {
            method: 'POST', 
            body: bod
        })
        .then(response => response.text())
        .then(response => {
            let parsed = JSON.parse(response)
            console.log(parsed)
            this.props.history.push('/')
        })
    }
    handleNewName(evt){
        this.setState({username: evt.target.value})

    }

    handleNewPassword(evt){
        this.setState({password: evt.target.value})
    }
 

    render(){
        return (
        <div>
        <form onSubmit = {this.handleSubmit}>
            <h2>New User? Sign up!</h2>
            <input placeholder = "username"
                   value = {this.state.username}
                   onChange = {this.handleNewName}/>
            <br/>       
            <input placeholder = "password"
                   value = {this.state.password}
                   onChange = {this.handleNewPassword}/>
            <br/>       
            <input type = "submit"/>
        </form>
        </div>
        )
    }
}

let Signup = withRouter(SignupForm)
export default Signup;