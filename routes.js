const { error } = require('console');
function routes(web3, app,  accounts, benzeneToken_Contract,benzeneTokenSale_Contract) {
    app.get('/price', async (request, response) => {
            benzeneTokenSale_Contract.methods.tokenPrice().call().then((i)=>{
                response.json(web3.utils.fromWei(i, 'ether'))
                console.log()
            });   
    });
    app.get('/transfer', async (request, response) => {
       
        var count = await web3.eth.getTransactionCount("0xFdcd021B3103DBd26497DD46fa06619d2e07c51E");
        var gasLimit = 3000000;
        var chainId = 4;
        var Tx = require('ethereumjs-tx').Transaction;
        var rawTransaction = {
            "from": "0xFdcd021B3103DBd26497DD46fa06619d2e07c51E",
            "nonce": "0x" + count.toString(16),
            "gasPrice": web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
            "gasLimit": web3.utils.toHex(gasLimit),
            "to": "0xE1e83Ff40a436b38720632843254188ed446B6DD",
            "value": "0x0",
            "data": benzeneToken_Contract.methods.transfer("0xE1e83Ff40a436b38720632843254188ed446B6DD", 100).encodeABI(),
            "chainId": chainId
        };
        var privKey = Buffer.from("109b563fb3a28cf86de55b38a969a3dfbfc3421d10e763c2343cac9a81c23e01", 'hex');
        var tx = new Tx(rawTransaction, { chain: 'rinkeby' });
        tx.sign(privKey);
        var serializedTx = tx.serialize();
        var receipt =  await web3.eth.accounts.signTransaction(rawTransaction,"109b563fb3a28cf86de55b38a969a3dfbfc3421d10e763c2343cac9a81c23e01",(err,signedtx)=>{
            if(err)
            console.log(err);
            else{
                web3.eth.sendSignedTransaction("0x"+serializedTx.toString('hex'),(err,res)=>{
                    if(err)
                        console.log(err);
                else{
                        console.log("Transaction Hash: ",res);
                        response.send("true");
                    }
                })
            }
            
        });
        
     
    });

    app.get('/createacc', async (request, response) => {
        const acc = web3.eth.accounts.create();
        console.log(acc)
    });
    app.get('/', async (request, response) => {
        response.json("Server running")
    });
    app.get('/balance', async (request, response) => {
        const address = "0xFdcd021B3103DBd26497DD46fa06619d2e07c51E";
        const name = benzeneToken_Contract.methods.balanceOf(address).call().then(console.log)
        response.send(name)
    });
    app.get('/transfer2', async (request, response) => {
        benzeneToken_Contract.methods
        .transfer("0xE1e83Ff40a436b38720632843254188ed446B6DD", "10")
        .call({ from: '0xFdcd021B3103DBd26497DD46fa06619d2e07c51E' }, function (err, res) {
          if (err) {
            console.log("An error occured", err)
            return
          }
          console.log("Hash of the transaction: " + res)
        })
      
    });
    

};

module.exports = routes
