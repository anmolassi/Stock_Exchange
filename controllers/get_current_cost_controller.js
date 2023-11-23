async function stock(identifier){
    const http = require('https');
    const options = {
      method: 'GET',
      hostname: 'latest-stock-price.p.rapidapi.com',
      port: null,
      path: `/any?Identifier=${encodeURIComponent(identifier)}`,
      headers: {
        'X-RapidAPI-Key': '3a8d8397d9msh10634f7763b5aeap16665cjsnd4331fa1e22d',
        'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
      }
    };
    return new Promise((resolve, reject) => {
        const req = http.request(options, function (res) {
            const chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                const body = Buffer.concat(chunks);
                const jsonData = JSON.parse(body.toString());
                // console.log(jsonData);
                resolve(jsonData);
            });
        });
        req.on('error', (error) => {
            console.error(`Error in the request: ${error}`);
            reject(error);
        });
        req.end();
    });
}
module.exports.getCost = async function (req, res) {
    console.log(req.params.identifier);
    let stockBazaar=await stock(req.params.identifier);
    for(let i=0;i<stockBazaar.length;i++){
        let temp={};
        temp['symbol']=stockBazaar[i]['symbol'];
        temp['open']=stockBazaar[i]['open'];
        temp['lastPrice']=stockBazaar[i]['lastPrice'];
        temp['identifier']=stockBazaar[i]['identifier'];
        temp['lossIndicator']=0; //0= loss 1=PROFIT 2= AT PAR
        if(temp['open']<temp['lastPrice']) temp['lossIndicator']=1;
        else if(temp['open']<temp['lastPrice']) temp['lossIndicator']=2;
        // console.log(temp);
        res.send(temp);
    }
}