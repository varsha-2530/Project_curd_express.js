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

app.put("/UpdateUser/:id", (request, response) => {
    const UserId = parseInt(request.params.id); // UUID is string

    const found = BlogUser.some(user => user.id === UserId);

    if (found) {
        const updateUser = request.body;

        BlogUser.forEach(user => {
            if (user.id === UserId) {
                if (updateUser.title) user.title = updateUser.title;
                if (updateUser.author) user.author = updateUser.author;
                if (updateUser.content) user.content = updateUser.content;
            }
        });

        response.status(200).json({
            message: `User with id ${UserId} updated successfully.`,
            users: BlogUser
        });

    } else {
        response.status(404).json({ message: "User not found" });
    }
});


app.put("UpdateUser/:id", (request, response) => {
    const UserId = parseInt(request.params.id);
    const found = BlogUser.some(BlogUsers => BlogUsers.id === UserId);
    console.log(found);
})

app.listen(PORT, () => {
    console.log(`server is runing on http://localhost:${PORT}`);

});
