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
    console.log('scanned....');
    let { userData } = this.props;

    scanTag (
      userData.did,
      userData.name,
>>>>>>> fdcde9d4fa9020f57f1d96b27c906463ec090636
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
>>>>>>> fdcde9d4fa9020f57f1d96b27c906463ec090636
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
