const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
let todos = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/", express.static(path.join(__dirname, "public")));

app.post("/todo/add", (req, res) => {
    const todo = req.body;
    todo.id = "" + new Date().getTime();
    todos.push(todo);
    res.json({ result: "Ok" });
    console.log();
});

app.get("/todo", (req, res) => {
    res.json({ todos: todos });
    console.log();
});
