import Web3 from 'web3';
let web3 = new Web3("http://ec2-34-220-53-37.us-west-2.compute.amazonaws.com:22000");
var SimpleStorage = require('../build/contracts/SimpleStorage.json')
let contract_address = '0xacc9e3a3a40973454a23ec57ff65ced1d23b5cb0'

let contract = web3.eth.Contract(SimpleStorage.abi, contract_address)

let contractObj = {
  contract: contract,
  contractAddress: contract_address,
  web3: web3,
}

// let contract = web3.eth.Contract(SimpleStorage.abi).at(contract_address);

export default contractObj
