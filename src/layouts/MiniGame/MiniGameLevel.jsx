import React, { Component } from 'react'
<<<<<<< HEAD
import styled from 'styled-components'
import { connect } from 'react-redux'
=======
import { connect } from 'react-redux';
>>>>>>> 44584adfb520cc83f0b678ecfcc7b5bb5dc47067
import QRScanner from './QRScanner.jsx'
import { scanTag } from '../../provider/geohunterContract'


const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    progress: state.user.data._progress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class MiniGameLevel extends Component {
  state = {
    hideQr: false
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    console.log(`MiniGameLevel: ${params.tagId}`)


  }

  async scannedId(id) {
    let { user } = this.props;
    await scanTag(user._userDid, user._username, id)

    this.setState({
      hideQr: true
    })


  }

  render() {
<<<<<<< HEAD
    let { progress, user } = this.props 
    let { hideQr } = this.state

    return (
      <div>
        <h1>Next Level: {progress + 1 }!</h1>
      
        <QRScanner 
          hide={hideQr}
          scannedObject={(id) => this.scannedId(id)}
        />
=======
    let { progress } = this.props

    return (
      <div>
        <QRScanner
          hide={false}
        />
        <h1>Next Level: {parseInt(progress, 10) + 1 }!</h1>
>>>>>>> 44584adfb520cc83f0b678ecfcc7b5bb5dc47067
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGameLevel)
