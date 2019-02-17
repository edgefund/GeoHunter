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
            return <ShowMiniGame />
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGame)