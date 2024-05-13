const router = require('express-promise-router')();
const taskController = require('../controllers/taskController');

router.get('/task', taskController.getAllTaskTask)
router.post('/task', taskController.createTask)
router.delete('/task', taskController.deleteTask)
router.put('/task', taskController.updateTask)


module.exports = router;