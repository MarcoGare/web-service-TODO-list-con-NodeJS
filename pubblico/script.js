const insertButton = document.getElementById('insertButton');
const todoInput = document.getElementById('todoInput');
let todos = [];

const token = "0824b19d-3f76-4ad1-bd20-c74aaa94a641";
const getUrl = "https://ws.cipiaceinfo.it/cache/get";
const setUrl = "https://ws.cipiaceinfo.it/cache/set";

const render = () => {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.textContent = todo.name;
        if (todo.completed) {
            li.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completa';
        completeButton.onclick = () => {
            completeTodo({
                id: todo.id,
                completed: true
            }).then(() => load());
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Elimina';
        deleteButton.onclick = () => {
            deleteTodo(todo.id).then(() => load());
        };

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
};

const send = (todo) => {
    todos.push(todo);
    return fetch(setUrl, {
        headers: {
            'Content-Type': 'application/json',
            'key': token
        },
        method: "POST",
        body: JSON.stringify({
            key: "todo",
            value: JSON.stringify(todos)
        })
    }).then(response => response.json()).then(result => {
        console.log(result);
        return result;
    }).catch(error => {
        console.error("Errore durante l'invio della todo:", error);
    });
};

const load = () => {
    return fetch(getUrl, {
        headers: {
            'Content-Type': 'application/json',
            'key': token
        },
        method: "POST",
        body: JSON.stringify({
            key: "todo"
        })
    }).then(response => response.json()).then((json) => {
        if (json.result) {
            todos = JSON.parse(json.result) || [];
        } else {
            todos = [];
        }
        render();
        console.log(json);
    }).catch(error => {
        console.error("Errore durante il caricamento della lista todo:", error);
    });
};

const completeTodo = (todo) => {
    const updatedTodos = todos.map((element) => {
        if (element.id === todo.id) {
            element.completed = true;
        }
        return element;
    });
    return fetch(setUrl, {
        headers: {
            'Content-Type': 'application/json',
            'key': token
        },
        method: "POST",
        body: JSON.stringify({
            key: "todo",
            value: JSON.stringify(updatedTodos)
        })
    }).then(response => response.json()).then(result => {
        console.log(result);
        return result;
    }).catch(error => {
        console.error("Errore durante il completamento della todo:", error);
    });
};

const deleteTodo = (id) => {
    const updatedTodos = todos.filter((element) => element.id !== id);
    return fetch(setUrl, {
        headers: {
            'Content-Type': 'application/json',
            'key': token
        },
        method: "POST",
        body: JSON.stringify({
            key: "todo",
            value: JSON.stringify(updatedTodos)
        })
    }).then(response => response.json()).then(result => {
        console.log(result);
        return result;
    }).catch(error => {
        console.error("Errore durante l'eliminazione della todo:", error);
    });
};

insertButton.onclick = () => {
    const todo = {
        id: new Date().getTime().toString(),
        name: todoInput.value,
        completed: false
    };
    send(todo).then(() => load()).then(() => {
        todoInput.value = '';
    });
};

load();

setInterval(() => {
    load();
}, 30000);
