import React, { Component } from 'react';
import withCheckLogin from '../../containers/with-check-login';
import BasicLayout from '../basic-layout'

@withCheckLogin
class Home extends Component {
  render () {
    return (
      <div>
          home...
      </div>
    )
  }
}

export default Home