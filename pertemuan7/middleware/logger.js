const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request ke ${req.url}`);
    next(); // Wajib dipanggil agar request diteruskan ke proses selanjutnya
};

module.exports = logger;