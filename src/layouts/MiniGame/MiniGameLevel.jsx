import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import QRScanner from './QRScanner.jsx'
import { scanTag } from '../../provider/geohunterContract'
import { imgArray }from '../../images/imageLoader'
import { loadImg }from '../../images/imageLoader'

const StyledContainer = styled.div`
  width: 100vw;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: ${props => `url(${loadImg(props.progress)}` }; */
  /* background: url(${imgArray[0]}); */
  
  & .qr-reader {
    width: 30rem;
    height: 30rem;
  }

  & .bold {
    font-weight: bold;
  }

`


const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    progress: state.user.data._progress,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class MiniGameLevel extends Component {
  state = {
    hideQr: false
  }

  componentDidMount() {
    // const { match: { params } } = this.props;

    // console.log(`MiniGameLevel: ${params.tagId}`)


  }

  async scannedId(id) {
    let { user } = this.props;
    await scanTag(user._userDid, user._username, id)

    this.setState({
      hideQr: true
    })
  }

  render() {
    let { progress, user } = this.props 
    let { hideQr } = this.state

    let prog = (progress === undefined) ? 0 : progress;
    
    return (
      <div>
        <StyledContainer
          progress={prog}
          >
          <h1>Let's go {user._username}!</h1>
          <h1 className='bold'>Next Level: {prog + 1}!</h1>
          <QRScanner
            className='.qr-reader'
            hide={false}
            scannedObject={(id) => this.scannedId(id)}
            />
        </StyledContainer>
        <QRScanner
          className='.qr-reader'
          hide={false}
          scannedObject={(id) => this.scannedId(id)}
          />
        </div>
      
  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniGameLevel)
