const fs = require('fs');
const path = require('path');

const walletDirectory = path.join(__dirname, '..', 'wallets')

function loadWallet(walletName) {
    try {
        const filePath = path.join(walletDirectory, `${walletName}.json`);
        if (!fs.existsSync(filePath)) {
            console.log('No wallet directory found.')
            return null; 
        }

        const walletData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return walletData;

    } catch (error) {
        console.error('Error loading wallet:', error.message);
        throw error;
    }
}

module.exports = { loadWallet }