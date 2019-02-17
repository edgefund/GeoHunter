import React, { Component } from 'react'
import { connect } from 'react-redux';
import QRScanner from './QRScanner.jsx'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    progress: state.user.data._progress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class MiniGameLevel extends Component {
  state = {}

  render() {
    let { progress } = this.props

    return (
      <div>
        <QRScanner
          hide={false}
        />
        <h1>Next Level: {parseInt(progress, 10) + 1 }!</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGameLevel)
