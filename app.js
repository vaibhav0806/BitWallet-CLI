const { Command } = require('commander');

require('dotenv').config();

const { getBitcoinBalance } = require('./api/getBitcoinBalance')
const { getBitcoinTransactions } = require('./api/getBitcoinTransactions')
const { generateUnusedBitcoinAddress } = require('./helper/generateUnusedBitcoinAddress')
const { generateBip39Mnemonic } = require('./helper/generateBip39Mnemonic')
const { loadWallet } = require('./helper/loadWallet')
const { listWallets } = require('./helper/listWallets')
const { saveWallet } = require('./helper/saveWallet')


const program = new Command();
program.version('1.0.0');

program
    .command('create <walletName>')
    .description('Create a new wallet')
    .action(async (walletName) => {
        const mnemonic = generateBip39Mnemonic();
        const wallet = {
            name: walletName,
            mnemonic
        }

        saveWallet(walletName, wallet);

        console.log(`Wallet "${walletName}" created.`);
        console.log('Mnemonic:', mnemonic);
    })

program
    .command('import <walletName> <mnemonic>')
    .description('Import a wallet from a Bip39 mnemonic')
    .action(async (walletName, mnemonic) => {
        const wallet = {
            name: walletName,
            mnemonic,
        }

        saveWallet(walletName, wallet);

        console.log(`Wallet "${walletName}" imported.`)
    })

program
    .command('list')
    .description('List all wallets')
    .action(() => {
        const wallets = listWallets();
        console.log('Wallets:');
        wallets.forEach((wallet) => {
            console.log(`- ${wallet.name}`);
        });
    })

program
    .command('balance <walletName')
    .description('Get Bitcoin balance of a wallet')
    .action(async (walletName) => {
        const wallet = loadWallet(walletName);

        if (!wallet) {
            console.error(`Wallet "${walletName}" not found`)
            return;
        }

        const apiKey = process.env.BLOCKCYPHER_API_KEY;
        if (!apiKey) {
            console.error('Blockcypher API key not found in .env file')
            return;
        }

        const balance = await getBitcoinBalance(wallet.mnemonic, apiKey);
        console.log(`Bitcoin balance for wallet "${walletName}" : ${balance} BTC`);
    })

program
    .command('transactions <walletName')
    .description('Get list of Bitcoin transactions of a wallet')
    .action(async (walletName) => {
        const wallet = loadWallet(walletName);
        if (!wallet) {
            console.error(`Wallet "${walletName}" not found.`);
            return;
        }

        const apiKey = process.env.BLOCKCYPHER_API_KEY;
        if (!apiKey) {
            console.error('BlockCypher API key not found in .env file.');
            return;
        }

        const transactions = await getBitcoinTransactions(wallet.mnemonic, apiKey);
        console.log(`Bitcoin transactions for wallet "${walletName}":`);
        transactions.forEach((transaction) => {
            console.log(transaction);
        });
    })

program
    .command('generate-address <walletName>')
    .description('Generate an unused Bitcoin address for a wallet')
    .action(async (walletName) => {
        const wallet = loadWallet(walletName);
        if(!wallet) {
            console.error(`Wallet "${walletName}" not found.`)
            return;
        }

        const apiKey = process.env.BLOCKCYPHER_API_KEY;
        
        const unusedAddress = await generateUnusedBitcoinAddress(wallet.mnemonic, apiKey);
        console.log(`Unused Bitcoin address for wallet "${walletName}" : ${unusedAddress}`)
    })

program.parse(process.argv)