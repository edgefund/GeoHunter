import React, { Component } from 'react'
import './NavBar.css'
import styled from 'styled-components'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15rem;
  font-weight: bold;
  vertical-align: center;
  background: #333745;
  padding-left: 2rem;
  padding-right: 5rem;
  box-shadow: .2rem 1rem 1rem .1rem rgba(0,0,0,0.56); 

  & div {
    vertical-align: center;
    color: #EEF5DB;
  }

  & .h1 {
    font-size: 3rem;

    &:active {
      color: #FE5F55;
      transform: scale(1.05);

    }
  }

  & .log-in {
    font-size: 2rem;
    /* border-bottom: 5px solid #303030; */
    /* padding-bottom: 1rem; */

    &:active {
      transform: scale(1.05);
      /* background: rgba(0,0,0,.2); */
      /* text-shadow: 0 0 .1rem .2rem black; */
      /* border-bottom: 5px solid white; */
      color: #FE5F55;
    }
  }

  /* &:hover {
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
  } */
`



export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <StyledNavBar>
        
        <Link to="/">
          <div className="h1">
              GEO HUNTER
          </div>
        </Link>
        <div className="log-in">
          Log In
        </div>
      </StyledNavBar>
    )
  }
}
