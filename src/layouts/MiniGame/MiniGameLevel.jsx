import React, { Component } from 'react'
import { connect } from 'react-redux'
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

  async scannedId(id) {
    let { user } = this.props;
    await scanTag(user._userDid, user._username, id)

    this.setState({
      hideQr: true
    })
  }

  render() {
    let { hideQr } = this.state

    return (
      <div>
        <QRScanner
          hide={hideQr}
          scannedObject={(id) => this.scannedId(id)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGameLevel)
