const express = require('express');
const lotteryController = require('../controllers/lotteryController');

const router = express.Router();

router.get('/', lotteryController.getLotteryList);
router.get('/status', lotteryController.getLotteryStatus);
router.post('/', lotteryController.getLottery);

module.exports = router;
