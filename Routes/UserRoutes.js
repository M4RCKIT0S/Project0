const express = require('express');
const checkAuth = require('../Middlewares/check-auth');
const userControllers = require('../Controllers/userController');

const router = express.Router();

router.get('/getUsers', userControllers.getUsers);
router.get('/getUserByUsername', checkAuth, userControllers.getUserUsername);
router.get('/:userId', userControllers.getUserId);
router.post('/register', userControllers.register);
router.delete('/:userId', checkAuth, userControllers.deleteUser);
router.post('/login', userControllers.login);
router.put('/:userId', checkAuth, userControllers.editUser);

module.exports = router;