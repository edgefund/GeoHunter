import React, { Component } from 'react'
import NavBarContainer from '../NavBar/NavBarContainer.jsx'
<<<<<<< HEAD
=======
import Game from './QRScanner.jsx';
>>>>>>> 82bde4280b2b9e048fc961a2c57bd7814e10c676
import { connect } from 'react-redux';

import GameInProgress from './GameInProgress.jsx'

function ShowModal(props) {
    return (
        <div>
            <p>Please Log In to Access the Mini-Game</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    let progress
    if(state.user.data) {
        progress = state.user.data._progress
    } else {
        progress = 0
    }

    return {
        user: state.user,
        progress,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getIPFSImage: () => dispatch({type: 'GET_IPFS_IMAGE'})
    }
}

class MiniGame extends Component {
    state = {}

    componentDidMount() {
        this.props.getIPFSImage();
    }

    render() {
        const isLoggedIn = !!this.props.user.data;
        return (
            <div className="MiniGame">
                <NavBarContainer />
                {isLoggedIn ? (
                    <GameInProgress
                        nextLevel={this.props.progress + 1}
                        userData={this.props.user.data}
                    />
                ) : (
                    <ShowModal />
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGame)
