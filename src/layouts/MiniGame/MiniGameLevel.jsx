import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';

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
      <h1>Next Level: {progress + 1 }</h1>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGameLevel)
