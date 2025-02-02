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

app.put("/todo/complete", (req, res) => {
    const todo = req.body;
    todos = todos.map((element) => {
        if (element.id === todo.id) {
            element.completed = true;
        }
        return element;
    });
    res.json({ result: "Ok" });
    console.log();
});

app.delete("/todo/:id", (req, res) => {
    todos = todos.filter((element) => element.id !== req.params.id);
    res.json({ result: "Ok" });
    console.log();
});

const server = app.listen(80, () => {
    console.log();
});