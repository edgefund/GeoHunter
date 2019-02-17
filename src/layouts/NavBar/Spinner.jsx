import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% {
    transform: rotateY(0deg) scale(1);
  }
  50% {
    transform: rotateY(180deg) scale(1.5);
  }
  50% {
    /* transform: rotate(180deg); */
  }
  100% {
    transform: rotateY(0deg) scale(1);
  }
`;

const quickspin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  85% {
    transform: rotate(0deg);
  }
  /*   85% {
      transform: rotate(180deg);
    } */
  100% {
    transform: rotate(360deg);
  }
`

const StyledSpinner = styled.div`
  display: ${props => props.hide ? 'none ': 'inline'};
  background: transparent;
  color: white;
  position: fixed;
  width: 100%;
  height: 100%;

  & .spinner-bg {
    position: relative;
    top: 40vh;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20rem;
    height: 20rem;
    background: rgba(0, 0, 0, .6);
    font-size: 2rem;
    color: white;
    text-align: center;
    border-radius: 1rem;
    animation: 3s infinite ${quickspin};
  }

  & .spinner-top {
    animation: 3s infinite ${spin};
  }

  & .spinner-bottom {
    animation: 3s infinite reverse ${spin};
  }
`

const Spinner = ({ hide }) => {
  return (
    <StyledSpinner
      hide={hide}
    >
      <div className="spinner-bg">
        <div className="spinner">
          <div className="spinner-top">GEO HUNTER</div>
          <br />
          <div className="spinner-bottom">ETH DENVER</div>
        </div>
      </div>
    </StyledSpinner>
  )
}

export default Spinner
