const express = require('express');
const app = express();
const BlogUser = require('./BlogUser');

const PORT = 3000;

app.use(express.json());

app.get('/showAllUser', (request, response) => {
    response.status(200).json(BlogUser);
})

app.listen(PORT, () => {
    console.log(`server is runing on http://localhost:${PORT}`);

})
