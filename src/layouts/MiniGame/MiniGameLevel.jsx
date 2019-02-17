import React, { Component } from 'react'
import styled from 'styled-components'
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
      <QRScanner 
        hide={false}
      />
      <h1>Next Level: {progress + 1 }!</h1>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGameLevel)
