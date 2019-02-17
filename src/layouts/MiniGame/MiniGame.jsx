import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../NavBar/NavBar.jsx'
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
        console.log(this.store);
        const isLoggedIn = this.props.user.name != undefined

        if (!isLoggedIn) {
            
            return <div><NavBar /><ShowModal /></div>
        } else {
            return <ShowMiniGame />
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGame)