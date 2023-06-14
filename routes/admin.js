const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  console.log('2️⃣ 다른 미들웨어');
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">추가</button></input></form>'
  );
});

router.post('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/'); // req : 요청의 본문을 분석하지 않음 👉 미들웨어를 이용해 분석기 등록
});

module.exports = router;
