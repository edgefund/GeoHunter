import React, { Component } from 'react'
import styled from 'styled-components'
import NavBarContainer from '../NavBar/NavBarContainer.jsx'
import Game from './Game.jsx'
import { connect } from 'react-redux';

function ShowModal(props) {
    return (
        <div>
            <p>Please Log In to Access the Mini-Game</p>
        </div>
    )
}

function ShowMiniGame(props) {
    return (<div>
        <Game />
    </div>)
}

function ShowClock(props) {
    return (<div>          
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.css" />
        Clock: <div class="your-clock"></div>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.js"></script>
        <script>
            var clock = $('.your-clock').FlipClock({
                // ... your options here
            });
        </script>
    </div>)
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

class MiniGame extends Component {
    state = {}

    render() {
        const isLoggedIn = this.props.user.data && this.props.user.data.name !== undefined;

        if (!isLoggedIn) {
            return <div><NavBarContainer /><ShowModal /></div>
        } else {
            return <div><NavBarContainer /><ShowMiniGame /></div>
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGame)