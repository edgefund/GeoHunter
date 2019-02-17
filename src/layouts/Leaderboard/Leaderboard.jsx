import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import NavBarContainer from '../NavBarContainer'
import LeaderTable from './LeaderTable.jsx'

const StyledLeaderboard = styled.div`
  background-color: #EEF5DB;

  & h1 {
    margin-top: 3rem;
    font-size: 3.6rem;
    text-align: center;
  }
`
export default class Leaderboard extends Component {
  state = {}

  render() {
    return (
      <StyledLeaderboard>
        <NavBarContainer />
        <h1>LEADERBOARD</h1>
        <LeaderTable />
      </StyledLeaderboard>
    )
  }
}