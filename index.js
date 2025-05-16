const express = require('express');
const app = express();
const BlogUser = require('./BlogUser');

const PORT = 3000;

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`server is runing on http://localhost:${PORT}`);
    
})
