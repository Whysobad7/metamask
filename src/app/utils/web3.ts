import Web3 from 'web3';

export const initWeb3 = async () => {
	// @ts-ignore: Ignore TypeScript error
	if (window.ethereum) {
		// @ts-ignore: Ignore TypeScript error
	  await window.ethereum.request({ method: 'eth_requestAccounts' });
	  // @ts-ignore: Ignore TypeScript error
	  return new Web3(window.ethereum);
	} else {
	  throw new Error('MetaMask not detected');
	}
  };
  
  export const getAccount = async (web3: Web3) => {
	const accounts = await web3.eth.getAccounts();
	return accounts[0];
  };
  
  export const getEthBalance = async (web3: Web3, address: string) => {
	return web3.eth.getBalance(address);
  };
  
  export const sendTransaction = async (web3: Web3, transactionObject: any) => {
	return web3.eth.sendTransaction(transactionObject);
  };

  export const getBnbBalance = async (web3: Web3, address: string) => {
	const balance = await web3.eth.getBalance(address, 'latest');
	return balance.toString();
  };
