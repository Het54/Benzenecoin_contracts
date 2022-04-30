const { error } = require('console');
function routes(web3, app,  accounts, benzeneToken_Contract,benzeneTokenSale_Contract) {
    app.get('/price', async (request, response) => {
            const name = benzeneToken_Contract.methods.name().call().then(console.log)
            benzeneTokenSale_Contract.methods.tokenPrice().call().then((i)=>{
                
                console.log(web3.utils.fromWei(i, 'ether'))
            });   
    });
    app.get('/transfer', async (request, response) => {
        // benzeneToken_Contract.methods.transfer("0x81a81447Bb25387DF06bEE69e5c183BCF280Aa92",10).send({from: "0xFdcd021B3103DBd26497DD46fa06619d2e07c51E",
            
        //     gas: 500000}).then(console.log).catch(error => {console.log(error)})
        var count = await web3.eth.getTransactionCount("0xFdcd021B3103DBd26497DD46fa06619d2e07c51E");
        var gasPriceGwei = 3;
        var gasLimit = 3000000;
        var chainId = 4;
        var Tx = require('ethereumjs-tx').Transaction;
        var rawTransaction = {
            "from": "0xFdcd021B3103DBd26497DD46fa06619d2e07c51E",
            "nonce": "0x" + count.toString(16),
            "gasPrice": web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            "gasLimit": web3.utils.toHex(gasLimit),
            "to": "0x81a81447Bb25387DF06bEE69e5c183BCF280Aa92",
            "value": "0x00",
            "data": benzeneToken_Contract.methods.transfer("0x81a81447Bb25387DF06bEE69e5c183BCF280Aa92", 10).encodeABI(),
            "chainId": chainId
        };
        var privKey = Buffer.from("109b563fb3a28cf86de55b38a969a3dfbfc3421d10e763c2343cac9a81c23e01", 'hex');
        var tx = new Tx(rawTransaction, { chain: 'rinkeby' });
        tx.sign(privKey);
        var serializedTx = tx.serialize();
        console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}\n------------------------`);
        var receipt =  web3.eth.signTransaction(rawTransaction,privKey,(err,signedtx)=>{
            if(err)
            console.log(err);
            else{
                console.log(signedtx);
                web3.eth.sendSignedTransaction(signedTx.rawTransaction,privKey,(err,res)=>{
                    if(err)
                console.log(err);
                else{
                console.log(res)
                    }
                })
            }
            
        });
        console.log(`Receipt info: \n${JSON.stringify(receipt, null, '\t')}\n------------------------`);
        
     
    });

    app.get('/createacc', async (request, response) => {
        const acc = web3.eth.accounts.create();
        console.log(acc)
    });
    app.get('/balance', async (request, response) => {
        const address = "0x81a81447Bb25387DF06bEE69e5c183BCF280Aa92";
        const name = benzeneToken_Contract.methods.balanceOf(address).call().then(console.log)
    });

};

module.exports = routes