const express = require('express');
const app = express();
const BlogUser = require('./BlogUser');
const uuid = require('uuid');

const PORT = 3000;

app.use(express.json());

app.get('/showAllUser', (request, response) => {
    response.status(200).json(BlogUser);
});

app.get('/showUser/:UserId', (request, response) => {
    const id = parseInt(request.params.UserId);
    let user = BlogUser.filter(BlogUsers => BlogUsers.id === id);

    (user.length !== 0) ? response.status(200).json(user)
        : response.status(404).json({ message: `User not found with id ${id}` })
});

app.post("/addUser", (request, response) => {
    console.log("User :", request.body);

    const { title, author, content } = request.body;

    BlogUser.push({
        id: uuid.v4(),
        title,
        author,
        content
    });

    response.status(200).json(BlogUser);

});


app.delete('/deleteUser/:uid', (request, response) => {
    const id = parseInt(request.params.uid);
    //  console.log(id);
    const found = BlogUser.some(user => user.id === id);
    //console.log(found);
    if (found) {
        const deleteMember = BlogUser.filter(BlogUsers => BlogUsers.id !== id);
        response.status(200).json(deleteMember);

    } else {
        response.status(400).json({ message: `User not found with id ${id}` })
    }
});

app.listen(PORT, () => {
    console.log(`server is runing on http://localhost:${PORT}`);

});
