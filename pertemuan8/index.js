const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todos');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

// 1. Global Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Memasang middleware buatan sendiri

// 2. Routing
// Semua request ke '/api/todos' akan di-handle oleh todoRoutes
app.use('/api/todos', todoRoutes);

// 3. Entrypoint
app.listen(PORT, () => {
    console.log(`Server API berjalan di http://localhost:${PORT}`);
});