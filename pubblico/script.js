const insertButton = document.getElementById('insertButton');
const todoInput = document.getElementById('todoInput');
let todos = [];

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
    console.log();
};

const send = (todo) => {
    return fetch("/todo/add", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    }).then(response => response.json()).then(result => {
        console.log(result);
        return result;
    });
};

const load = () => {
    return fetch("/todo").then(response => response.json()).then((json) => {
        todos = json.todos;
        console.log(todos);
        render();
    });
};

const completeTodo = (todo) => {
    return fetch("/todo/complete", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    }).then(response => response.json()).then(result => {
        console.log(result);
        return result;
    });
};


const deleteTodo = (id) => {
    console.log(id);
    return fetch(`/todo/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).then(result => {
        console.log(result);
        return result;
    });
};

insertButton.onclick = () => {
    const todo = {
        name: todoInput.value,
        completed: false
    };
    send(todo).then(() => load()).then(() => {
        todoInput.value = '';
        console.log();
    });
};

load();

setInterval(() => {
    load();
}, 30000);
