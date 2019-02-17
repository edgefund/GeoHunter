import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import NavBar from '../NavBar'

export default class MiniGame extends Component {
    state = {}

    render() {
        return (
            <div>
                <NavBar />
                <div>MiniGame Placeholder</div>
            </div>
        );
    }
}