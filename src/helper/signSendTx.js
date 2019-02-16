
require('dotenv').config()

// let tx = this.contractname.methods.dosomething(parameters);

let sendTx = async (tx, web3, contractAddress) => {
  let txObject = {
    gas: 50000,
    data: tx.encodeABI(),
    from: process.env.PUBLIC_KEY,
    to: contractAddress
  };

  let signedTx = await web3.eth.accounts.signTransaction(txObject, process.env.PRIVATE_KEY);
  return web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .catch(e => {
      return Promise.reject();
    });
}

export default sendTx