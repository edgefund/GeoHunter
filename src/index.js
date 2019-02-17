import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// import { UserIsAuthenticated } from './util/wrappers'

// Layouts
import AppContainer from './AppContainer'
import Leaderboard from './layouts/Leaderboard/Leaderboard'
import Splash from './layouts/Splash'
import MiniGame from './layouts/MiniGame/MiniGame'
import './index.css';

// Redux Store
import store from './store'

ReactDOM.render((
    <Provider store={store}>
      <AppContainer>
        <Router>
          <div>
            <Route exact path="/" component={Splash} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/minigame" component={MiniGame} />
          </div>
        </Router>
      </AppContainer>
    </Provider>
  ),
  document.getElementById('root')
)
