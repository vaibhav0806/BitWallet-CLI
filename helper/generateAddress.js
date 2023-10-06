const bitcoin = require('bitcoinjs-lib');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
const bip39 = require('bip39');

function generateAddress(mnemonic) {
    const network = bitcoin.networks.testnet;

    const pathTestnet = `m/44'/1'/0'/0`


    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, network);

    let account = root.derivePath(pathTestnet);
    let node = account.derive(0).derive(0);

    let btcAddress = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network: network,
    }).address

    return btcAddress;
}

module.exports = { generateAddress };