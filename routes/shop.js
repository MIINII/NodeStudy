const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<h1>미들웨어 홈 실행중</h1>');
});

module.exports = router;
