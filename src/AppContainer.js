import React, { Component } from 'react'
import { connect } from 'react-redux';

import web3Options from './web3Options'
import quorumConfig from './quorumConfig'
import Web3 from 'web3';

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.initilizeStore();
  }

  initilizeStore() {
    console.log(quorumConfig.providerEndpoint)
    this.props.initWeb3(new Web3(quorumConfig.providerEndpoint))

    for(let contract of web3Options.contracts) {
      this.props.addContract(contract)
    }
  }

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

