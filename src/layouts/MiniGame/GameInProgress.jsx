import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scanTag } from '../../provider/geohunterContract'
import QRScanner from './QRScanner.jsx'
import MiniGameLevel from './MiniGameLevel.jsx'


<<<<<<< HEAD
class GameInProgress extends Component {
=======
  handleScanId(id){
    let { userData } = this.props;
    scanTag(
      userData._userDid,
      userData._userName,
      id
    )
  }
>>>>>>> 1379b6bc81d1c754d2cebdcb41a463430d106e11

  componentDidMount() {
    this.props.getIPFSImage();
  }

  render() {
    return (
      <div>
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


<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps)(GameInProgress);                                                                                                                                                                                                                                                                                                                   
=======
export default connect(mapStateToProps, mapDispatchToProps)(GameInProgress);
>>>>>>> 1379b6bc81d1c754d2cebdcb41a463430d106e11
