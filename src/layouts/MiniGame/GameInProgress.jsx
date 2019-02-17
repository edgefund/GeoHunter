import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scanTag } from '../../provider/geohunterContract'
import QRScanner from './QRScanner.jsx'
import MiniGameLevel from './MiniGameLevel.jsx'


class GameInProgress extends Component {

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


export default connect(mapStateToProps, mapDispatchToProps)(GameInProgress);                                                                                                                                                                                                                                                                                                                   