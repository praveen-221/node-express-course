const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./navbar-app'));

// app.get('/', (req,res)=>{
//     res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// })

app.all('*', (req,res)=>{
    res.status(404).send('<h1>Page not found</h1>');
})

app.listen(5000, ()=>{
    console.log("Server is listening at 5000...");
})