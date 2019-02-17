const GeoHunter = artifacts.require('./GeoHunter.sol');
const truffleAssert = require('truffle-assertions');

/* These tests ensure the correct operation of the GeoHunter contract.
**/
contract('Testing GeoHunter', async (accounts) => {
    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     **/
    it('Should register the hard coded tag UID for Tag 4', async () => {
        const geoHunter = await GeoHunter.new();
        const expected = "46199909d0b5fd";
        let actual;

        const tag4 = await geoHunter.tagList.call(4);
        actual = tag4.Uid;

        assert.equal(actual, expected);
    });


    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     **/
    it('Should register the hard coded tag index for the UID for Tag 2', async () => {
        const geoHunter = await GeoHunter.new();
        const expected = 2;
        let actual;

        const tag4 = await geoHunter.tagList.call(4);
        actual = tag4.Uid;

        assert.equal(actual, expected);
    });





});
