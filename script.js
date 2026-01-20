// ===== GET ALL THE ELEMENTS FROM HTML =====
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTodosSpan = document.getElementById('totalTodos');
const activeTodosSpan = document.getElementById('activeTodos');

// ===== STORE OUR TODOS IN AN ARRAY =====
let todos = [];
let currentFilter = 'all'; // Can be 'all', 'active', or 'completed'

// ===== LOAD TODOS FROM BROWSER STORAGE WHEN PAGE LOADS =====
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    } else {
        showEmptyState();
    }
}

// ===== SAVE TODOS TO BROWSER STORAGE =====
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// ===== ADD A NEW TODO =====
function addTodo() {
    const todoText = todoInput.value.trim();

    // Check if input is empty
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new todo object
    const newTodo = {
        id: Date.now(), // Unique ID based on timestamp
        text: todoText,
        completed: false
    };

    // Add to the beginning of the array
    todos.unshift(newTodo);

    // Clear the input box
    todoInput.value = '';

    // Save and display
    saveTodos();
    renderTodos();

    // Focus back on input for easy adding
    todoInput.focus();
}

// ===== DELETE A TODO =====
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// ===== TOGGLE TODO COMPLETE/INCOMPLETE =====
function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// ===== FILTER TODOS =====
function filterTodos() {
    if (currentFilter === 'all') {
        return todos;
    } else if (currentFilter === 'active') {
        return todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        return todos.filter(todo => todo.completed);
    }
}

// ===== UPDATE STATISTICS =====
function updateStats() {
    const total = todos.length;
    const active = todos.filter(todo => !todo.completed).length;

    totalTodosSpan.textContent = `${total} total task${total !== 1 ? 's' : ''}`;
    activeTodosSpan.textContent = `${active} active`;
}

// ===== SHOW/HIDE EMPTY STATE =====
function showEmptyState() {
    if (todos.length === 0) {
        emptyState.classList.add('show');
        todoList.style.display = 'none';
    } else {
        emptyState.classList.remove('show');
        todoList.style.display = 'block';
    }
}

// ===== RENDER (DISPLAY) ALL TODOS =====
function renderTodos() {
    // Clear the list
    todoList.innerHTML = '';

    // Get filtered todos
    const filteredTodos = filterTodos();

    // Update statistics
    updateStats();

    // Show empty state if needed
    showEmptyState();

    // Create HTML for each todo
    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        todoItem.innerHTML = `
            <div class="todo-content" onclick="toggleTodo(${todo.id})">
                <div class="todo-checkbox"></div>
                <span class="todo-text">${todo.text}</span>
            </div>
            <button class="btn btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
        `;

        todoList.appendChild(todoItem);
    });
}

// ===== EVENT LISTENERS =====

// Add todo when clicking the Add button
addBtn.addEventListener('click', addTodo);

// Add todo when pressing Enter key
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Filter button clicks
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Update current filter
        currentFilter = this.dataset.filter;

        // Re-render todos with new filter
        renderTodos();
    });
});

// ===== INITIALIZE APP WHEN PAGE LOADS =====
loadTodos();
