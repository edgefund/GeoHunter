import React, { Component } from 'react'
import { connect } from 'react-redux';

import web3Options from './provider/web3Options'
import quorumConfig from './provider/quorumConfig'
import Web3 from 'web3';

class AppContainer extends Component {

  render() {

    return ( 
      <div className="AppContainer">
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    initWeb3: (web3) => dispatch({
      type: 'INIT_WEB3',
      web3: web3,
    }),
    addContract: (contract) => dispatch({
      type: 'ADD_CONTRACT',
      contract: contract,
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)

