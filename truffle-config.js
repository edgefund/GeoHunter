module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      host: "ec2-34-220-53-37.us-west-2.compute.amazonaws.com",
      port: 22000,
      network_id: "*" // Match any network id
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }

  }

};
