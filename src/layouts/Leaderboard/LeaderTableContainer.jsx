import { connect } from 'react-redux';
import LeaderTable from './LeaderTable.jsx'

const sortTime = (a, b) => {
  return a.elapsedTime - b.elapsedTime;
}

const mapStateToProps = (state) => {
  // let unsortedLeaderboard = state.leaderboard.leaderObjectArray;
  // Object.keys(unsortedLeaderboard).map(function (key, index) {
  //   unsortedLeaderboard["elapsedTime"] = unsortedLeaderboard[_endTime] - unsortedLeaderboard[_startTime];
  // });
  // let sortedLeaderData = unsortedLeaderboard.sort(sortTime)

  return {
    leaderObjectArray: state.leaderboard.leaderObjectArray,
    // loggingIn: state.user.loggingIn,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    // onLoginUserClick: (event) => {
    //   event.preventDefault();
    //   dispatch({
    //     type: 'USER_LOGGING_IN'
    //   })
    //   dispatch(loginUser());
    // },
    // onLogoutUserClick: (event) => {
    //   event.preventDefault();
    //   dispatch({
    //     type: 'USER_LOGGING_IN'
    //   })
    //   dispatch(logoutUser());
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderTable)

