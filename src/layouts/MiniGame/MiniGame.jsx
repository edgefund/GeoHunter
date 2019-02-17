import React, { Component } from 'react'
import styled from 'styled-components'
<<<<<<< HEAD
import NavBar from '../NavBar/NavBar.jsx'
=======
import NavBar from '../NavBar'
import Game from './Game.jsx'

function ShowModal(props) {
    return (
        <div>
            <p>Please Log In to Access the Mini-Game</p>
        </div>
    )
}

function ShowMiniGame(props) {
    <div>
        <Game />
    </div>
}
>>>>>>> 1435af7f8fc3a5aabe466567085f7f77d6b36156

export default class MiniGame extends Component {
    state = {}

    render() {
        const isLoggedIn = this.props.user.name != undefined;

        if (!isLoggedIn) {
            return <ShowModal />
        } else {
            return <ShowMiniGame />
        }
    }
}