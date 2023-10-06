# BitWallet CLI

## Before using :
 - use `npm i` command before using the commands
 - Blockcypher API Key has to be included in the .env file. Go to <a href="https://www.blockcypher.com/">Blockcypher</a> and create a new API Key if you don't already have one.

## Operations :
 - Creating a wallet : `node app create <walletName>`
 - Import a wallet : `node app import <walletName> <mnemonic>`
 - Listing all wallets : `node app list`
 - Getting Bitcoin balance of wallet : `node app balance <walletName>`
 - Getting list of transactions of a wallet : `node app transactions` <walletName>`
 - Getting an unused Bitcoin address of a wallet : `node app generate-address <walletName>`

 Feel free to fork and update the repository as required.

 Created by Me <a href="https://www.github.com/vaibhav0806">Github</a> | <a href="https://www.linkedin.com/in/vaibhav0806">LinkedIn</a>