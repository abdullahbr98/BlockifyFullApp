const Migrations = artifacts.require("Migrations");
const Counter = artifacts.require("Counter")
module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Counter,10)
};
