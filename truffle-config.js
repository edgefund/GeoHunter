import { quorumConfig } from './src/provider/quorumConfig';

const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      provider: new HDWalletProvider(
        quorumConfig.privateKey,
        quorumConfig.providerEndpoint
      ),
      network_id: quorumConfig.networkId.toString(),
      gas: 0,
      gasPrice: 0
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    localDevelopment: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
