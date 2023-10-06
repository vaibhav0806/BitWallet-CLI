const axios = require('axios');

const { generateAddress } = require('../helper/generateAddress')

async function getBitcoinTransactions(mnemonic, apiKey) {
    try {
        const walletAddress = generateAddress(mnemonic); // Replace with your address generation logic
        console.log(`Fetching transactions for address: ${walletAddress}`);

        const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/full`;

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Token ${apiKey}`,
            },
        });

        const transactions = response.data.txs || [];

        const formattedTransactions = transactions.map((tx) => ({
            date: new Date(tx.confirmed || tx.received),
            amountBTC: tx.outputs[0].value / 100000000, // Convert from Satoshis to BTC
            confirmations: tx.confirmations || 0,
            address: tx.inputs[0].addresses[0],
        }));

        return formattedTransactions;
        // return transactions;
        
    } catch (error) {
        console.error('Error fetching Bitcoin transactions:', error.message);
        throw error;
    }
}

module.exports = { getBitcoinTransactions };