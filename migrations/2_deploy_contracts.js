var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var GeoHunter = artifacts.require("./GeoHunter.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(GeoHunter);
};
