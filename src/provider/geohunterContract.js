import Web3 from 'web3';
import { sendTx } from './signSendTx';
import web3Options from './web3Options'
import quorumConfig from './quorumConfig'

const web3 = new Web3(quorumConfig.providerEndpoint);

const contract = web3.eth.Contract(
  web3Options.contracts.GeoHunter.abi,
  web3Options.contracts.GeoHunter.address
);

export async function registerNewTag(_tagUid, _ipfsHash, _lat, _long) {
  registerTag(0, _tagUid, _ipfsHash, _lat, _long);
}

// returns Promise<TransactionReceipt>
export async function registerTag(_tagIndex, _tagUid, _ipfsHash, _lat, _long )  {
  let tx = await contract.methods.registerTag(_tagIndex, _tagUid, _ipfsHash, _lat, _long);
  return sendTx(tx);
}

export async function registerUser(_userDid, _username) {
  let tx = await contract.methods.registerUser(_userDid, _username);
  return sendTx(tx);
}

export async function getUser(_userIndex) {
  let x = await contract.methods.getUser(_userIndex).call();
  let result = {
    _userDid: x._userDid,
    _username: x._username,
    _progress: x._progress,
    _startTime: x._startTime,
    _endTime: x._endTime,
  };
  return result;
}

export async function scanTag(_userDid, _username, _tagUid) {
  let tx = contract.methods.scanTag(_userDid, _username, _tagUid);
  let result = await sendTx(tx);

  console.log(result);
}

// returns Promise<{_nextTagIndex, _nextTagUid, _success}>
export async function nextTagRequired(_userDid) {
  let x = await contract.methods.nextTagRequired(_userDid).call();
  let result = {
    _nextTagIndex: x._nextTagIndex,
    _nextTagUid: x.providerEndpoint_nextTagUid,
    _success: x._success,
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


