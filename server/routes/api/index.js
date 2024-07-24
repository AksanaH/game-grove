const router = require('express').Router();
const userRoutes = require('./user-routes');
const rawgRoutes = require('./api/rawg-routes');


router.use('/users', userRoutes);

app.use('/api/rawg', rawgRoutes);

module.exports = router;
