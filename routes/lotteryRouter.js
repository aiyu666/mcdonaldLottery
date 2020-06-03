const express = require('express');
const lotteryController = require('../controllers/lotteryController');

const lottery = lotteryController;
const router = express.Router();

router.post('/', lottery);

module.exports = router;
