const express = require('express');
const { searchUsers, updateUsers } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate')

const router = express.Router();

// GET: Search users
router.get('/users/search',authenticate, searchUsers);

// POST: Update users
router.post('/users/update',authenticate, updateUsers);

module.exports = router;
