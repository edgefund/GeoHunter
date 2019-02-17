import { connect } from 'react-redux';
import LeaderTable from './LeaderTable.jsx'

const mapStateToProps = (state) => {
  return {
    leaderObjectArray: state.leaderboard.leaderObjectArray,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderTable)

