'use client'
import React, { useState, useEffect } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { initWeb3, getAccount, getEthBalance, getBnbBalance, sendTransaction } from './utils/web3';
import Web3 from 'web3';

const WalletPage: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [address, setAddress] = useState<string>('');
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [bnbBalance, setBnbBalance] = useState<string>('0');
  const [recipient, setRecipient] = useState<string>('');

  useEffect(() => {
	const init = async () => {
	  try {
		const web3Instance = await initWeb3();
		setWeb3(web3Instance);
		const account = await getAccount(web3Instance);
		setAddress(account);
		const ethBalance = await getEthBalance(web3Instance, account);
		const bnbBalance = await getBnbBalance(web3Instance, account);
		setEthBalance(web3Instance.utils.fromWei(ethBalance, 'ether'));
		setBnbBalance(web3Instance.utils.fromWei(bnbBalance, 'ether'));
	  } catch (error) {
		console.error('Error initializing web3:', error);
	  }
	};
	init();
  }, []);

  const handleSendTransaction = async () => {
    if (!web3) return;
    try {
      const transactionObject = {
        from: address,
        to: recipient,
        value: web3.utils.toWei('0.1', 'ether'), 
      };
      await sendTransaction(web3, transactionObject);
      const balance = await getEthBalance(web3, address);
      setEthBalance(web3.utils.fromWei(balance, 'ether'));
      setRecipient('');
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  return (
    <Container maxWidth='md' sx={{
		border: '1px solid black',
		padding: 2,
		borderRadius: 1,
		marginTop: 2
	}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">My Wallet</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">Address: {address}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">ETH Balance: {ethBalance} ETH</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">BNB Balance: {bnbBalance} BNB</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Recipient Address"
            variant="outlined"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSendTransaction}>Send Transaction</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WalletPage;