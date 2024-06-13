const router = require('express-promise-router')();
const userController = require('../controllers/userController');

// router.get('/users', userController.readUser);
router.post('/users', userController.createUser);
router.get('/users', userController.getUserAll);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id', userController.updateUserById);

module.exports = router;
