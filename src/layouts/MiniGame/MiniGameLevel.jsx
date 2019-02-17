import React, { Component } from 'react'
import { connect } from 'react-redux'
import QRScanner from './QRScanner.jsx'
import { scanTag } from '../../provider/geohunterContract'


const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    progress: state.user.data._progress,
    minigame: state.minigame
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getIPFSImage: () => dispatch({type: 'GET_IPFS_IMAGE'})
    }
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

  componentDidMount() {
    this.props.getIPFSImage();
  }


  render() {
    let { hideQr } = this.state

    return (
      <div>
        <QRScanner
          hide={hideQr}
          scannedObject={(id) => this.scannedId(id)}
        />
        <img src={'https://cloudflare-ipfs.com/ipfs/' + this.props.minigame.nextImage} alt="logo" />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGameLevel)
