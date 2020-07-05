const router = mainModule.express.Router();
const login_controller = require('../controllers/login.controller');

router.post('/',  mainModule.passport.authenticate('local', { failureRedirect: '/login' }), login_controller.login);
router.get('/guest',       login_controller.loginAsAGuest);

module.exports = router;