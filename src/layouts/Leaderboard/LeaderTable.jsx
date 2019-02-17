import React, { Component } from 'react'
import styled from 'styled-components'
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

  sortTimeAcsencing = (a, b) => {
    let aDiff = a._endTime - a._startTime
    let bDiff = b._endTime - b._startTime
    return aDiff - bDiff;
  }

  timeString = (seconds) => {
    let secs = seconds % 60;
    let mins = Math.floor(seconds/60);
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`
  }

  render() {
    let { leaderObjectArray } = this.props;

    let sortedLeaderData = leaderObjectArray.sort(this.sortTimeAcsencing)

    const leaderboardData = sortedLeaderData.filter(leaderData => leaderData.bDiff > 0);
    const unfinishedData = sortedLeaderData.filter(leaderData => leaderData.bDiff <= 0);
    
    const leaderCells = sortedLeaderData.map((data, index) =>
      <LeaderCell
        name={data._username}
        time={this.timeString(data._endTime - data._startTime)}
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

