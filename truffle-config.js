const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      provider: new HDWalletProvider(
        "15E0DB619B64C1E175CE0F0F05F21F19BFCAF2B1DDF1C47C88F7C778CFD47AF5",
        "https://geohunter.duckdns.org:1337/"
      ),
      network_id: "10",
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
