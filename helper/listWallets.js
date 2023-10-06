const fs = require('fs')
const path = require('path')

const walletDirectory = path.join(__dirname, '..', 'wallets')

function listWallets() {
    if (!fs.existsSync(walletDirectory)) {
        console.log('No wallets found.')
        return []; 
    }

    const walletFiles = fs.readdirSync(walletDirectory);

    if (walletFiles.length === 0) {
        console.log('No wallets found.')
        return []; 
    }

    const wallets = [];

    walletFiles.forEach((walletFile) => {
        const walletFilePath = path.join(walletDirectory, walletFile);
        const walletData = JSON.parse(fs.readFileSync(walletFilePath));
        wallets.push(walletData);
    });

    return wallets;
}

module.exports = { listWallets }