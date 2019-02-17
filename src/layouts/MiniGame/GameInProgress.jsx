import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scanTag } from '../../provider/geohunterContract'
import QRScanner from './QRScanner.jsx'

<<<<<<< HEAD


class GameInProgess extends Component {

  handleScanId(id){
    let { userData } = this.props;
    scanTag(
      userData._userDid, 
      userData._userName,
=======
class GameInProgress extends Component {
  handleScanId(id) {
    let { userData } = this.props;

    scanTag (
      userData.did,
      userData.name,
>>>>>>> 44584adfb520cc83f0b678ecfcc7b5bb5dc47067
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
<<<<<<< HEAD
        <MiniGameLevel />
=======
          <img src={'https://cloudflare-ipfs.com/ipfs/' + this.props.minigame.nextImage} alt="logo" />
>>>>>>> 44584adfb520cc83f0b678ecfcc7b5bb5dc47067
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
