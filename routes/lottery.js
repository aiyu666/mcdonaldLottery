const express = require('express');

const router = express.Router();

/* GET lottery info */
router.get('/', (req, res) => {
  res.render('index', { title: 'test' });
});

/* POST a new lottery request */
router.post('/', (req, res) => {
  res.render('index', { title: 'test' });
});


module.exports = router;
