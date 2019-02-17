import React, { Component } from 'react'
import styled from 'styled-components'
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