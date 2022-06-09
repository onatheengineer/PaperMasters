const MintIdentity = artifacts.require("MintIdentity");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MintIdentity", (accounts) => {
    //console.log(accounts);
    describe("Testing Constructor",() => {
        it("should be the same name", () => {
            //console.log("is this working?");
            return MintIdentity.deployed()
                .then(instance => {
                    //console.log(instance);
                    return instance.name();
                })
                .then((namename) => {
                    //console.log(namename)
                    assert.equal(
                        namename, "andrew", "not the correct name");
                })
        })

        it("should be the same description", () => {
            //console.log("is this working?");
            return MintIdentity.deployed()
                .then(instance => {
                    //console.log(instance);
                    return instance.descr();
                })
                .then((descrdescr) => {
                    //console.log(descrdescr)
                    assert.equal(
                        descrdescr, "descr with andy", "not the correct name");
                })
        })
    })
});
