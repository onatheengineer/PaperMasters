const MintIdentity = artifacts.require("MintIdentity");

module.exports = function (deployer) {
    deployer.deploy(MintIdentity);
};
