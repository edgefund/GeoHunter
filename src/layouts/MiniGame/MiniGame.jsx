import React, { Component } from 'react'
import NavBarContainer from '../NavBar/NavBarContainer.jsx'
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
    return {}
}

class MiniGame extends Component {
    state = {}

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
