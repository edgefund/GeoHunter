import React, { Component } from 'react'
import NavBarContainer from '../NavBar/NavBarContainer.jsx'
import { connect } from 'react-redux';
import styled from 'styled-components'

import GameInProgress from './GameInProgress.jsx'

let StyledModel = styled.div`
    padding-top: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & .top {
        font-weight: bold;
    }
`

function ShowModal(props) {
    return (
        <StyledModel>
            <h1 className='top'>Please Log In</h1>
            <h1 className='bottom'>Access the Mini-Game</h1>
        </StyledModel>
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
