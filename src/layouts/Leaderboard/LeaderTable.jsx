import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import LeaderCell from './LeaderCell.jsx'

const cellData = [
  {
    name: "Bob",
    time: "150"
  },
  {
    name: "Alice",
    time: "2000"
  },
  {
    name: "Craig",
    time: "300"
  },
  {
    name: "Derrel",
    time: "1000"
  },
  {
    name: "Tom",
    time: "600"
  },
]

const StyledLeaderTable = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column; 
  align-items: center;
  margin: 2rem auto;
`

export default class LeaderTable extends Component {
  state = {}

  sortTime = (a, b) => {
    return a.time - b.time;
  }

  timeString = (seconds) => {
    let secs = seconds % 60;
    let mins = Math.floor(seconds/60);
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`
  }

  render() {

    let sortedData = cellData.sort(this.sortTime)
    const leaderCells = sortedData.map((data, index) =>
      <LeaderCell
        name={data.name}
        time={this.timeString(data.time)}
        key={index}
      />
  );

    return (
      <StyledLeaderTable>
        {leaderCells}
      </StyledLeaderTable>
    )
  }
}

