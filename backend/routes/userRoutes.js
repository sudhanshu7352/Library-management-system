const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const { authenticateUserJWT } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/verify', authenticateUserJWT, (req, res) => {
    res.status(200).json({ message: 'Token verified successfully', user: req.user });
});
module.exports = router;
