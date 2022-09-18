const {createReadStream} = require("fs");

const stream = createReadStream('./content/big.txt', 'utf8');

stream.on('res', (result)=>{
    console.log(result);
})