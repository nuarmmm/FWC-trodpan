
const list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

function saveTodos() {
    const todos = [];

    document.querySelectorAll(".todo").forEach(function(todo) {
        todos.push(todo.textContent);
    });

    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function addTodo(text) {
    const todo = document.createElement("div");

    todo.className = "todo";
    todo.textContent = text;

    todo.addEventListener("click", function() {
        const answer = confirm("Do you want to remove this TO DO?");

        if (answer) {
            todo.remove();
            saveTodos();
        }
    });

    list.prepend(todo);
}

function loadTodos() {
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        cookie = cookie.trim();

        if (cookie.startsWith("todos=")) {
            const value = cookie.substring("todos=".length);

            try {
                const todos = JSON.parse(decodeURIComponent(value));

                todos.reverse().forEach(function(todo) {
                    addTodo(todo);
                });
            } catch (error) {
                console.log("Invalid cookie");
            }
        }
    }
}

newBtn.addEventListener("click", function() {
    const todo = prompt("Enter a new TO DO:");

    if (todo !== null && todo.trim() !== "") {
        addTodo(todo);
        saveTodos();
    }
});

loadTodos();

