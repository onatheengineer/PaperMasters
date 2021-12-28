const MintIdentity = artifacts.require("MintIdentity");

contract("MintIdentity",  accounts => {
    it("Name should be a value failed force",async () => {
        return MintIdentity.deployed()
            .then(instance => {return instance.name()})
            .then(name => {
                assert.equal(name,"this test test two","Name Failed to Set");
            })
    })

    it("Decr should be a value",async () => {
        return MintIdentity.deployed()
            .then(instance => {return instance.descr()})
            .then(descr => {
                assert.equal(descr,"my test test with andy","Descr Failed to Set");
            })
    })

});