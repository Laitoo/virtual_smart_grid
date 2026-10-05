const jwt = require('jsonwebtoken');

// Role yang boleh mengendalikan semua pembangkit.
const STAFF_ROLES = ['root', 'admin', 'dosen', 'asisten'];

// Role khusus per pembangkit (mengikuti enum `users.role` dan menu di website).
const PLANT_ROLE = {
    pltb: 'pltb',
    pltmh: 'pltmh',
    plts: 'plts',
    pv: 'plts',
    ongrid: 'plts',
    offgrid: 'plts',
};

const extractToken = (req) => {
    const header = req.headers['authorization'];
    if (!header) return null;
    // Mendukung "Bearer <token>" maupun token polos (format yang dipakai website saat ini).
    return header.startsWith('Bearer ') ? header.slice(7) : header;
};

exports.STAFF_ROLES = STAFF_ROLES;

exports.verifyToken = (req, res, next) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({ error: true, message: 'Token tidak ditemukan' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: true, message: err.message });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

// Batasi endpoint hanya untuk role tertentu. Pakai setelah verifyToken.
exports.requireRole = (...allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
        return res.status(403).json({ error: true, message: 'Anda tidak memiliki izin untuk aksi ini' });
    }
    next();
};

// True jika `role` boleh mengirim perintah ke pembangkit `plant`.
exports.canControlPlant = (role, plant) => {
    return STAFF_ROLES.includes(role) || (PLANT_ROLE[plant] !== undefined && role === PLANT_ROLE[plant]);
};

// Middleware: izinkan perintah ke satu pembangkit hanya untuk staf atau role pembangkit itu sendiri.
exports.authorizePlant = (plant) => (req, res, next) => {
    if (!exports.canControlPlant(req.userRole, plant)) {
        return res.status(403).json({ error: true, message: `Role '${req.userRole}' tidak boleh mengendalikan ${plant}` });
    }
    next();
};
