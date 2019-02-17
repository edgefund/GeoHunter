import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scanTag } from '../../provider/geohunterContract'
import QRScanner from './QRScanner.jsx'

class GameInProgress extends Component {
  handleScanId(id) {
    console.log('scanned....');
    let { userData } = this.props;

    scanTag (
      userData.did,
      userData.name,
      id
    )
  }

  componentDidMount() {
    this.props.getIPFSImage();
  }

  render() {
    return (
      <div>
        <QRScanner scannedObject={(id) => this.handleScanId(id)}/>
          <img src={'https://cloudflare-ipfs.com/ipfs/' + this.props.minigame.nextImage} alt="logo" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.data,
    minigame: state.minigame
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getIPFSImage: () => dispatch({type: 'GET_IPFS_IMAGE'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameInProgress);
