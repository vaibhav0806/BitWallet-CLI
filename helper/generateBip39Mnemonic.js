const bip39 = require('bip39');

function generateBip39Mnemonic() {
    const mnemonic = bip39.generateMnemonic(128);
    return mnemonic;
}

module.exports = { generateBip39Mnemonic }