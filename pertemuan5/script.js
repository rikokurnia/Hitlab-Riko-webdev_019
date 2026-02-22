const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('minimal_tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('minimal_tasks', JSON.stringify(tasks));
}

function updateCounter() {
    const activeTasks = tasks.filter(t => !t.completed).length;
    taskCounter.textContent = `${activeTasks} tugas tersisa`;
}

function renderTasks() {
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        
        li.innerHTML = `
            <div class="checkbox" onclick="toggleTask(${task.id})"></div>
            <span class="task-text" onclick="toggleTask(${task.id})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">×</button>
        `;
        
        taskList.appendChild(li);
    });
    
    updateCounter();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    
    // Validasi input kosong dengan alert
    if (!text) {
        alert('Tugas tidak boleh kosong!');
        return;
    }
    
    tasks.unshift({ id: Date.now(), text, completed: false });
    taskInput.value = '';
    
    saveTasks();
    renderTasks();
});

window.toggleTask = (id) => {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
};

window.deleteTask = (id) => {
    // Tambahan konfirmasi alert saat menghapus
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
};

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

renderTasks();