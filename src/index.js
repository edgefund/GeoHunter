import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
// import App from './App'
import AppContainer from './AppContainer'
import Leaderboard from './layouts/Leaderboard/Leaderboard'
// import Home from './layouts/home/Home'
import Splash from './layouts/Splash'
import Dashboard from './layouts/dashboard/Dashboard'
import Profile from './user/layouts/profile/Profile'
import './index.css';
// Redux Store
import store from './store'

// const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <AppContainer>
        <Router>
          <div>
            <Route exact path="/" component={Splash} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/minigame" component={<div />} />
            {/* <Route path="minigame" component={<div />} /> */}
            {/* <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)} /> */}
            {/* <Route path="/profile" component={UserIsAuthenticated(Profile)} /> */}
          </div>
        </Router>
      </AppContainer>
    </Provider>
  ),
  document.getElementById('root')
)
