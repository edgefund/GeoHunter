// let tx = this.contractname.methods.dosomething(parameters);
let quorumConfig = require('../quorumConfig')

let sendTx = async (tx, web3, contractAddress) => {
  let txObject = {
    gas: 50000,
    data: tx.encodeABI(),
    from: quorumConfig.publicKey,
    to: contractAddress
  };

  let signedTx = await web3.eth.accounts.signTransaction(txObject, quorumConfig.privateKey);
  return web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .catch(e => {
      return Promise.reject();
    });
}

export default sendTx