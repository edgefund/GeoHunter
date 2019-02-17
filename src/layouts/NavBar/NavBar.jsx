import React, { Component } from 'react'
import './NavBar.css'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Spinner from './Spinner.jsx'

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15rem;
  font-weight: bold;
  vertical-align: center;
  background: #333745;
  padding-left: 2rem;
  padding-right: 5rem;
  box-shadow: .2rem 1rem 1rem .1rem rgba(0,0,0,0.56);

  & div {
    vertical-align: center;
    color: #EEF5DB;
  }

  & .h1 {
    font-size: 2rem;

    &:active {
      color: #FE5F55;
      transform: scale(1.05);

    }
  }

  & .log-in {
    font-size: 2rem;
    /* border-bottom: 5px solid #303030; */
    /* padding-bottom: 1rem; */

    &:active {
      transform: scale(1.05);
      /* background: rgba(0,0,0,.2); */
      /* text-shadow: 0 0 .1rem .2rem black; */
      /* border-bottom: 5px solid white; */
      color: #FE5F55;
    }
  }
`

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { userData, onLoginUserClick, onLogoutUserClick, loggingIn } = this.props

    const loginButton = ( !userData ) ? (
      <div
        className="log-in"
        onClick={(e) => onLoginUserClick(e)}
      >
        Log In
      </div>
    ) : (
      <div
        className="log-out"
        onClick={(e) => onLogoutUserClick(e)}
      >
        Log Out
      </div>
    )

    return (
      <React.Fragment>
        <Spinner hide={!loggingIn}/>
        <StyledNavBar>
          <Link
            to="/"
            style={{textDecoration: 'none'}}
          >
            <div className="h1">
                GEO HUNTER
            </div>
          </Link>
          {loginButton}
        </StyledNavBar>
      </React.Fragment>
    )
  }
}
