import Web3 from 'web3';
import { sendTx } from './signSendTx';

const web3 = new Web3("http://ec2-34-220-53-37.us-west-2.compute.amazonaws.com:22000");
const GeoHunter = require('../build/contracts/GeoHunter.json');
const contract_address = '';
const contract = web3.eth.Contract(GeoHunter.abi, contract_address);

// returns Promise<TransactionReceipt>
export async function registerTag(_tagIndex, _tagUid, _ipfsHash, _lat, _long )  {
  let tx = contract.methods.registerTag(_tagIndex, _tagUid, _ipfsHash, _lat, _long);
  return sendTx(tx);
}

export async function registerUser(_userDid, _username) {
  let tx = contract.methods.registerUser(_userDid, _username);
  return sendTx(tx);
}

export async function scanTag(_userDid, _username, _tagUid) {
  let tx = contract.methods.scanTag(_userDid, _username, _tagUid);
  return sendTx(tx);
}

// returns Promise<{_nextTagIndex, _nextTagUid, _success}>
export async function nextTagRequired(_userDid) {
  let x = await contract.methods.nextTagRequired(_userDid).call();
  let result = {
    _nextTagIndex: x._nextTagIndex,
    _nextTagUid: x._nextTagUid,
    _success: x._success
  };
  return result;
}

// returns Promise<_totalTags>
export async function getTotalTags() {
  return contract.methods.getTotalTags().call();
}

/// returns Promise<_totalUsers>
export async function getTotalUsers() {
  return contract.methods.getTotalUsers().call();
}

/// returns Promise<_totalScans>
export async function getTotalScans()  {
  return contract.methods.getTotalScans().call();
}

