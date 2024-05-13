const router = require('express-promise-router')();
const projectController = require('../controllers/projectController');

// router.get('/users', userController.readUser);
router.get('/project', projectController.getAllProject);
router.get('/project/:id', projectController.getProjectById);
router.post('/project', projectController.createProject);
router.delete('/project/:id', projectController.deleteProject);
// router.put('/project/:id', projectController.updateUserById);

module.exports = router;
