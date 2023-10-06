const axios = require('axios')
const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const bip39 = require('bip39');

async function generateUnusedBitcoinAddress(mnemonic, apiKey) {
    const network = bitcoin.networks.testnet;
    const pathTestnet = `m/44'/1'/0'/0`; 

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, network);

    let addressIndex = 0;
    let unusedAddress = null;

    while (!unusedAddress) {
        const account = root.derivePath(pathTestnet);
        const node = account.derive(0).derive(addressIndex);

        const btcAddress = bitcoin.payments.p2pkh({
            pubkey: node.publicKey,
            network: network,
        }).address;

        const apiUrl = `https://api.blockcypher.com/v1/btc/test3/addrs/${btcAddress}/full`;

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Token ${apiKey}`,
            },
        });

        const transactions = response.data.txs || [];

        if(transactions.length == 0) {
            unusedAddress = btcAddress;
        }

        addressIndex++;
    }

    return unusedAddress;
}

module.exports = { generateUnusedBitcoinAddress }