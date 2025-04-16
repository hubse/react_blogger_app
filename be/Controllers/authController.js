const { registerUser, authenticateUser } = require('../services/userService');
const verifyToken = require('../Middlewares/verifyToken');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await registerUser(username, email, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const { user, token } = await authenticateUser(email, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const protectedRoute = (req, res) => {
    res.json({
        message: 'Access granted to protected route',
        userId: req.userId
    });
};

module.exports = {
    register,
    login,
    protectedRoute,
    verifyToken
};
