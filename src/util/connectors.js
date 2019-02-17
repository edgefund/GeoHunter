import { Connect } from 'uport-connect'

export const uport = new Connect('Geo-Hunter', {
  network: "rinkeby",
  bannerImage: { "/": "/ipfs/QmZct4qLvWsF3EtQno3C6G5fL4ZaaviLkVRnJKqJBNbbVV" },
  description: "Geo Hunter is a racing game with geo-located checkpoints. "
})

export const web3 = uport.getWeb3()
