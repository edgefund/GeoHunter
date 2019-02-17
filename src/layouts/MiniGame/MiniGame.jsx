import React, { Component } from 'react'
import styled from 'styled-components'
import NavBar from '../NavBar'

export default class MiniGame extends Component {
    state = {}

    render() {
        return (
            <div>
                <NavBar />
                <p>Go to Level {this.props.level}</p>
                <div>

                </div>
            </div>
        );
    }
}