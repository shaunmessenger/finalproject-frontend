import React, {Component} from "react";
import { Link, withRouter } from 'react-router-dom';


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
            console.log(json)
            console.log(json.loginFailed)
            if(json.loginFailed){
            console.log("you failed")
            } else {
            console.log("welcome")
            this.props.history.push('/Homepage')
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
                <input
                    type="text"
                    placeholder="username"
                    value={this.state.inputPassword}
                    onChange={this.handlePasswordChange}>
                </input>
                <input 
                    type="submit">
                </input>
                </form>    
                <p>{this.state.loginFailed ? "Failed Login" : null }</p>
            </div>
        )
    }
}
let Login = withRouter(LoginBasic)
export default Login;