const fs = require('fs')
const path = require('path')

const { generateAddress } = require('./generateAddress')

const walletDirectory = path.join(__dirname, '..', 'wallets')

function saveWallet(walletName, wallet) {
    if (!fs.existsSync(walletDirectory)) {
        fs.mkdirSync(walletDirectory, { recursive: true });
    }

    const btcAddress = generateAddress(wallet.mnemonic);

    const filePath = path.join(walletDirectory, `${walletName}.json`);

    const walletData = {
        name: walletName,
        mnemonic: wallet.mnemonic,
        address: `${btcAddress}`
    }

    fs.writeFileSync(filePath, JSON.stringify(walletData, null, 2));

    console.log(`Wallet "${walletName}" saved locally.`);
    console.log(`Path: ${filePath}`);
}

module.exports = { saveWallet }