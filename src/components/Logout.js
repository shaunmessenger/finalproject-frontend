import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class LogoutBasic extends Component {

    render(){
        this.props.reset()
        this.props.history.push('/')
        return (
            null
        )
    }
}

let Logout = withRouter(LogoutBasic)
export default Logout