import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scanTag } from '../../provider/geohunterContract'
import QRScanner from './QRScanner.jsx'



class GameInProgess extends Component {

  handleScanId(id){
    let { userData } = this.props;
    scanTag(
      userData._userDid, 
      userData._userName,
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
        <MiniGameLevel />
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
