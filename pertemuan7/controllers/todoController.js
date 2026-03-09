const todos = require('../data/todos');
let nextId = 4;

exports.getAllTodos = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Data to-do berhasil diambil",
        data: todos
    });
};

exports.createTodo = (req, res) => {
    const { text, completed = false } = req.body;
    
    if (!text) {
        return res.status(400).json({ success: false, message: "Teks to-do tidak boleh kosong" });
    }

    const newTodo = { id: nextId++, text, completed };
    todos.push(newTodo);

    res.status(201).json({
        success: true,
        message: "Data to-do berhasil ditambahkan",
        data: newTodo
    });
};