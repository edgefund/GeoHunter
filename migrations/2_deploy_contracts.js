var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var GeoHunter = artifacts.require("./GeoHunter.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  console.log("Deploying GeoHunter...");
  deployer.deploy(GeoHunter)
  .then(() => console.log("GeoHunter deployed to: " + GeoHunter.address))
};
