const router = require('express').Router();

// Import API routes from /api/index.js (no need to write index.js - it's implied)
const apiRoutes = require('./api');

// add prefix `/api` to api routes imported from the `api` directory
router.use('/api', apiRoutes);



module.exports = router