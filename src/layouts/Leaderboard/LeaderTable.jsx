import React, { Component } from 'react'
import styled from 'styled-components'
import LeaderCell from './LeaderCell.jsx'

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

  sortLevelDesending = (a, b) => {
    return b._progress - a._progress;
  }

  timeString = (nanoseconds) => {
    let seconds = nanoseconds / 10 ** 9
    let secs = seconds % 60;
    let mins = Math.floor(seconds/60);

    secs = Math.round(secs, 2);

    return `${mins}:${secs < 10 ? `0${secs}` : secs}`
  }

  render() {
    let { leaderObjectArray } = this.props;
    let sortedLeaderData = leaderObjectArray.sort(this.sortTimeAcsencing)

    const leaderboardData = sortedLeaderData.filter(leaderData => leaderData._endTime > 0);
    const unfinishedData = sortedLeaderData.filter(leaderData => leaderData._endTime <= 0);

    let unfinishedLeaderboardData = unfinishedData.sort(this.sortLevelDesending)

    const leaderCells = leaderboardData.map((data, index) =>
      <LeaderCell
        name={data._username}
        time={this.timeString(data._endTime - data._startTime)}
        key={index}
      />
    );

    const unfinishedLeaderCells = unfinishedLeaderboardData.map((data, index) =>
      <LeaderCell
        name={data._username}
        progress={data._progress}
        key={index}
      />
    );

    return (
      <StyledLeaderTable>
        {leaderCells}
        {unfinishedLeaderCells}
      </StyledLeaderTable>
    )
  }
}
