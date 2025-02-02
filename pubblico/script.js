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
