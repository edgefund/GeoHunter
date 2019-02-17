let SimpleStorage = require('../../build/contracts/SimpleStorage.json')
let GeoHunter = require('../../build/contracts/GeoHunter.json')

// TODO: Add GeoHunter address
let web3Options = {
  contracts: {
      GeoHunter: {
        abi: GeoHunter.abi,
        address: '0x84449df066d98685ab48c0f2b8474b6c21b21819',
      },
      SimpleStorage: {
        abi: SimpleStorage.abi,
        address: '0x8707f505ef4501fda25fd36c75d2b0c6315c6868',
      }
  }
}

export default web3Options
