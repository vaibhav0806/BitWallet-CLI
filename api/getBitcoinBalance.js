const axios = require('axios')

const { generateAddress } = require('../helper/generateAddress')

async function getBitcoinBalance(mnemonic, apiKey) {
    try {
        const walletAddress = generateAddress(mnemonic); 
        const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${walletAddress}/balance`;

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Token ${apiKey}`,
            },
        });

        const balanceSatoshis = response.data.balance;
        const balanceBTC = balanceSatoshis / 100000000; 

        return balanceBTC.toFixed(8);
        
    } catch (error) {
        console.error('Error fetching Bitcoin balance:', error.message);
        throw error;
    }
}

module.exports = { getBitcoinBalance };