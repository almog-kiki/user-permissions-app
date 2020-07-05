const router = mainModule.express.Router();
const user_controller = require('../controllers/user.controller');

router.get('/roles', user_controller.getRoles);
router.get('/:id',      user_controller.get);
router.get('/',        user_controller.getAll);
router.post('/',       user_controller.create);
router.delete('/:id', user_controller.delete);
router.post('/deleteAll',  user_controller.deleteAll);

module.exports = router;