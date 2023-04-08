const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/users.controller');



router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);
// router.put('/', updateUser);

module.exports = router;