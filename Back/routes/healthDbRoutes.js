const express = require('express');
const router = express.Router();
const checkHealth = require('../middleware/healthDbCheck')

router.get('/', checkHealth.checkDatabaseHealth)

module.exports = router