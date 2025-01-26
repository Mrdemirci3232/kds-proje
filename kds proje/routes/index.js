const router = require('express').Router();
const routes = require('./router');
router.use(routes);
module.exports = router;