const GeoHunter = artifacts.require('./GeoHunter.sol');
const truffleAssert = require('truffle-assertions');

// These tests ensure the correct operation of the GeoHunter contract.

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
    it('Should register the hard coded tag IPFS hash Tag 2', async () => {
        const geoHunter = await GeoHunter.new();
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
        const geoHunter = await GeoHunter.new();

        await geoHunter.registerTag(3, "x6199909d0b5fd", "3mWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t", "", "");
        const result = await geoHunter.tagNowRegistered();

        truffleAssert.eventEmitted(result, 'tagNowRegistered');
    });


    const tender = await Tender.new(123, 45);

    await tender.setIpfsHash('Any string will work in here');
    await tender.openTender();

    const result = await tender.tenderIsOpen();

    assert.isTrue(result);





});





