import React, { Component } from 'react'
import Button from '../components/Button/Button'
import { Link } from 'react-router-dom'
import './Splash.css'

export default class Splash extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className='splash'>
        <Link to="/leaderboard">
          <Button text="LEADERBOARD" color='teal' />
        </Link>
        <Link to="/minigame">
          <Button text="START MINI-GAME" color='red' />
        </Link>
      </div>
    )
  }
}

