require('dotenv').config()
let SimpleStorage = require('../build/contracts/SimpleStorage.json')

let web3Options = {
  providerEndpoint: process.env.PROVIDER_ENDPOINT,
  contracts: [
      {
        name: `SimpleStorage`,
        abi: SimpleStorage.abi,
        address: '0xacc9e3a3a40973454a23ec57ff65ced1d23b5cb0',
      },
  ]
}

export default web3Options



// let contract = web3.eth.Contract(SimpleStorage.abi, contract_address)

// let contractObj = {
//   contract: contract,
//   contractAddress: contract_address,
//   web3: web3,
// }