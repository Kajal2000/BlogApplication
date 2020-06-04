const express = require('express');
const bodyParser = require('body-parser');
const blog_app = express();
blog_app.use(bodyParser.json())

const data = require("./Routes/blog.js")
blog_app.use("/", data)

blog_app.listen(8000, () => {
    console.log("server is listening..............)")
});