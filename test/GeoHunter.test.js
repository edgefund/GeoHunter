const GeoHunter = artifacts.require('./GeoHunter.sol');
const truffleAssert = require('truffle-assertions');

// These tests ensure the correct operation of the GeoHunter contract.

contract('Testing GeoHunter', async (accounts) => {
    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     **/
    it('Should register the hard coded tag UID for Tag 4', async () => {
        const geoHunter = await GeoHunter.deployed();
        const expected = "46199909d0b5fd";
        let actual;

        const tag4 = await geoHunter.tagList.call(4);
        actual = tag4.Uid;

        assert.equal(actual, expected);
    });

    /* Tests the functionality of the constructor.
     * Simply check that the params are stored.
     **/
    it('Should register the hard coded tag IPFS hash Tag 2', async () => {
        const geoHunter = await GeoHunter.deployed();
        const expected = "2mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t";
        let actual;

        const tag2 = await geoHunter.tagList.call(2);
        actual = tag2.ipfsHash;

        assert.equal(actual, expected);
    });

    /* Tests the functionality of the registerTag function.
     * Check that the UID of Tag 3 can be updated.
     **/
    it('Should register a new tag UID to replace Tag 3', async () => {
        const geoHunter = await GeoHunter.deployed();
        const expected = "x36199909d0b5fd";

        await geoHunter.registerTag(3, expected, "3mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", "", "");
        const actual = await geoHunter.getTag(3);

        assert.equal(actual[0], expected);
    });

    it('Should emit an event when a new tag is added', async () => {
        const geoHunter = await GeoHunter.deployed();

        const result = await geoHunter.registerTag(0, "66199909d0b5fd", "3mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", "", "");

        truffleAssert.eventEmitted(result, 'tagNowRegistered');
    });

    it('Test user 1 should progress after scanning the first item', async () => {
        const geoHunter = await GeoHunter.deployed();
        const expected = 1;

        const result = await geoHunter.scanTag("did:example:1123456789abcdefghi", "Test User 1", "16199909d0b5fd");
        const actual = await geoHunter.getUser(1);

        assert.equal(actual[2], expected);
    });

    it('Test user 1 should progress after scanning the second item', async () => {
        const geoHunter = await GeoHunter.deployed();
        const expected = 2;

        const result = await geoHunter.scanTag("did:example:1123456789abcdefghi", "Test User 1", "26199909d0b5fd");
        const actual = await geoHunter.getUser(1);

        assert.equal(actual[2], expected);
    });

    it('Test user 1 should NOT progress after scanning the fourth item', async () => {
        const geoHunter = await GeoHunter.deployed();
        const expected = 2;

        const result = await geoHunter.scanTag("did:example:1123456789abcdefghi", "Test User 1", "46199909d0b5fd");
        const actual = await geoHunter.getUser(1);

        assert.equal(actual[2], expected);
    });

});





