let SimpleStorage = require('../../build/contracts/SimpleStorage.json')
let GeoHunter = require('../../build/contracts/GeoHunter.json')

// TODO: Add GeoHunter address
let web3Options = {
  contracts: {
      GeoHunter: {
        abi: GeoHunter.abi,
        address: '0x10c86cffcb7e3b64b23d1abf56a1e06451bbb3f1',
      },
      SimpleStorage: {
        abi: SimpleStorage.abi,
        address: '0x8707f505ef4501fda25fd36c75d2b0c6315c6868',
      }
  }
}

export default web3Options
