import Web3 from 'web3';
import quorumConfig from './quorumConfig'
import web3Options from './web3Options'

const web3 = new Web3(quorumConfig.providerEndpoint);
const privateKey = quorumConfig.privateKey;
const fromAddress = quorumConfig.publicKey;

export async function sendTx (tx) {
  console.log('privateKey: ', privateKey);
  console.log('publicKey: ', fromAddress);

  let txObject = {
    gas: estimateGas(),
    data: tx.encodeABI(),
    from: fromAddress,
    to: web3Options.contracts.GeoHunter.address
  };

  console.log(txObject);

  let signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey)
    .catch(error => console.log(error));

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction)
  .on("transactionHash", (txHash) => {
    console.log("signAndSendTx() TxHash: " + txHash)
  })
  .on('confirmation', (confirmationNumber, receipt) => {})
  .on('receipt', (txReceipt) => {
    console.log("signAndSendTx success. Tx Address: " + txReceipt.transactionHash);
  })
  .catch(e => {
    return Promise.reject();
  });
}

function estimateGas() {
  return 0xFFFFF;
}
