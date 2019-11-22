import React, { Component } from 'react';
import withCheckLogin from '../../containers/with-check-login'

@withCheckLogin
 class Error extends Component {
  render() {
    return (
      <div>
        <h1>404...</h1>
      </div>
    )
  }
}

export default Error
