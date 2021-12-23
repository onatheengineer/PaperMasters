const MintIdentityTest = artifacts.require("MintIdentityTest");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MintIdentityTest", function (/* accounts */) {
  it("should assert true", async function () {
    await MintIdentityTest.deployed();
    return assert.isTrue(true);
  });
});
