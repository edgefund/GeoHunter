import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Leaderboard from './Leaderboard/Leaderboard.jsx'
import Splash from './Splash'

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Splash} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/minigame" component={<div/>} />
      </div>
    );
  }
}

export default Main;