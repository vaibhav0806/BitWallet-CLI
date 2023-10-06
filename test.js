const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Replace 'yourMnemonic' with the actual BIP39 mnemonic you want to convert
const mnemonic = 'oval siege rebuild provide exclude issue east flag day dwarf endorse mechanic';

// Generate a seed from the mnemonic
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Generate a BIP32 root key from the seed
const root = bitcoin.bip32.fromSeed(seed);

// Derive the first account (index 0)
const account = root.derivePath("m/44'/0'/0'/0/0");

// Get the public key and address
const publicKey = account.publicKey;
const address = bitcoin.payments.p2pkh({ pubkey: publicKey }).address;

console.log('Address:', address);
