var express = require('express');
var router = express.Router();

var roll = require('../commands/roll');
router.post('/roll', roll);

var lunch = require('../commands/lunch');
router.post('/lunch', lunch);

module.exports = router;
