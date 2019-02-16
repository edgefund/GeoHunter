import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import uportIcon from '../../images/uport-icon.png'


const StyledLeaderCell = styled.div`
  width: 80vw;
  height: 20rem;
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: center;
  margin: 1rem;
  box-shadow: 0rem .2rem 1.5rem .6rem rgba(0,0,0,0.56);
  transition: transform .5s, box-shadow .5s;
  background-color: white;
  
  &:hover {
    transform: translateY(-.5rem);
    box-shadow: 0rem .7rem 1.5rem .6rem rgba(0,0,0,0.56);
  }

  & img{
    height: 20rem;
  }
`

const LeaderCell = ({img, name, time}) => {

  let image = img ? img : uportIcon

  return (
    <StyledLeaderCell>
      <table>
        <tbody>
          <tr>
            <th>{name}</th>
          </tr>
          <tr>
            <td>{time}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <img src={image} />
      </div>
    </StyledLeaderCell>
  )
}

export default LeaderCell;
