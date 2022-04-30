const { error } = require('console');
function routes(web3, app,  accounts, benzeneToken_Contract,benzeneTokenSale_Contract) {
    app.get('/price', async (request, response) => {
            const name = benzeneToken_Contract.methods.name().call().then(console.log)
            benzeneTokenSale_Contract.methods.tokenPrice().call().then((i)=>{
                
                console.log(web3.utils.fromWei(i, 'ether'))
            });   
    });
    app.get('/transfer', async (request, response) => {
        benzeneToken_Contract.methods.transfer("0x81a81447Bb25387DF06bEE69e5c183BCF280Aa92",10).send({from: "0xFdcd021B3103DBd26497DD46fa06619d2e07c51E",
            
            gas: 500000}).then(console.log).catch(error => {console.log(error)})
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