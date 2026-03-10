const API_URL = 'http://localhost:3000/api/todos';
const taskList = document.getElementById('task-list');
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');

// 1. READ: Mengambil data dari Backend saat halaman dimuat
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success) {
            renderTodos(result.data);
        }
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        alert('Gagal terhubung ke server. Pastikan backend menyala.');
    }
}

// 2. RENDER: Memperbarui UI (State Sync)
function renderTodos(todos) {
    taskList.innerHTML = ''; // Kosongkan list sebelum render ulang
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        li.innerHTML = `
            <span class="task-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <button class="btn btn-sm btn-danger delete-btn" onclick="deleteTodo(${todo.id})">Hapus</button>
        `;
        
        taskList.appendChild(li);
    });
}

// 3. CREATE: Mengirim data baru ke Backend
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, completed: false })
        });

        const result = await response.json();
        
        if (result.success) {
            taskInput.value = ''; // Kosongkan input
            fetchTodos(); // State Sync: Panggil ulang data terbaru dari server
        }
    } catch (error) {
        console.error('Gagal menambah data:', error);
    }
});

// 4. DELETE: Menghapus data di Backend
window.deleteTodo = async (id) => {
    if (!confirm('Yakin ingin menghapus tugas ini?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        
        if (result.success) {
            fetchTodos(); // State Sync: Panggil ulang data setelah dihapus
        }
    } catch (error) {
        console.error('Gagal menghapus data:', error);
    }
};

// Inisialisasi awal
fetchTodos();