import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class LogoutBasic extends Component {

    render(){
        this.props.reset()
        return (
            this.props.history.push('/')
        )
    }
}

let Logout = withRouter(LogoutBasic)
export default Logout