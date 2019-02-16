import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  margin: 1rem;
  width: 30rem;
  height: 20rem;
  border-radius: 1rem;
  font-size: 3rem;
  font-weight: bold;
  vertical-align: center;
  color: ${props => props.color || "black"};
  border: .5rem solid ${props => props.color || "black"};
  background: transparent;

  &:hover {
    color: white;
    border: white;
    background: ${props => props.color || "black"};
  }

  &:active {
    box-shadow: 0 0 .1rem .2rem rgba(0,0,0,.4);
    transform: scale(.99);

  }

  &:focus {
    outline:0;
  }
`

const Button = ({text, clicked, color}) => {
    return (
      <StyledButton
        color={color}
        onClick={clicked}
      >
        {text}
      </StyledButton>
    )
} 

export default Button
