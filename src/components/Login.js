import React, {Component} from "react";
import { withRouter } from 'react-router-dom';


class LoginBasic extends Component{
    constructor(){
        super();
        this.state = {
            username: "",
            password: "",
            inputUsername: "",
            inputPassword: "",
            loginFailed: false
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        let newUsername = this.state.inputUsername
        let newPassword = this.state.inputPassword
        this.setState({
            username: newUsername,
            password: newPassword
        })
        fetch('/login', {
            method: "POST",
            body: (JSON.stringify({
                username: newUsername,
                password: newPassword
            }))
        })    
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.setState({loginFailed:json.loginFailed})
            
            if(json.loginFailed){
                console.log("you failed")
            } else if (json.mustMakeGoalProfile){
                this.setState({
                    userID: json.userID
                    })
                this.props.history.push('/setUpGoal')
            } else {
                this.setState({
                    userID: json.userID
                    })
                this.props.history.push('/getSavingsStatus')
            }

            
        })
    
    }
    handleUsernameChange = event => {
        this.setState({inputUsername: event.target.value})
    }

    handlePasswordChange = event => {
        // NOTE: event.target.value is not exatly the same as the value in 'input'
        this.setState({inputPassword: event.target.value})
    }
    linkToSignup = event => {
        this.props.history.push('/Signup')
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <h2>Login Page</h2>
                <input
                    type="text"
                    placeholder="username"
                    //NOTE: we can set the state without value, but we can't clear the input box
                    value={this.state.inputUsername}
                    onChange={this.handleUsernameChange}>
                </input>
                <br/>
                <input
                    type="text"
                    placeholder="password"
                    value={this.state.inputPassword}
                    onChange={this.handlePasswordChange}>
                </input>
                <br/>
                <input 
                    type="submit">
                </input>
                <br/>
                <button onClick={this.linkToSignup}>
                    New User?
                </button>

                </form>    
                <p>{this.state.loginFailed ? "Failed Login" : null }</p>
            </div>
        )
    }
}
let Login = withRouter(LoginBasic)
export default Login;