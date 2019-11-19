import React, { Component } from 'react';
import routhes from './config/routhes';
import { BrowserRouter as Router,Route,Redirect,NavLink,Switch } from "react-router-dom";

//git push -u origin chaochenxin 将代码推送到远程分支上去
  class App extends Component {
    render() {
      return (
        <Router>
          <Switch>
            {routhes.map( (component,index) => 
              <Route {...component} key={index} />
            )}
          </Switch>
        </Router>
      );
    }
  }

  export default App;