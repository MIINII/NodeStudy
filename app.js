// 2. express 사용해보기

// Module
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 🧪 분석기
// 요청이 어디로 향하든 본문 분석이 이루어지게 하기 위해
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
  // 다음 미들웨어로 요청이 이동할 수 있게 실행되어야함
  console.log('1️⃣ 항상 실행중...');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('2️⃣ 다른 미들웨어');
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">추가</button></input></form>'
  );
});

// 이 컴포넌트?는 미들웨어 'add-product' 전이나 후에 두지않아도 된다
// 경로에 공통점이 없고, 'add-product'와 'product'는 다르기 때문
// 1-2 : '/' 전에만 오면 된다. 그 후에 온다면 저것보다 먼저 실행
app.post('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/'); // req : 요청의 본문을 분석하지 않음 👉 미들웨어를 이용해 분석기 등록
});

// use : 새로운 미들웨어 함수 추가
app.use('/', (req, res, next) => {
  console.log('1️⃣-2️⃣ 미들웨어다!');
  res.send('<h1>미들웨어 홈 실행중</h1>');
});

const server = http.createServer(app);

server.listen(3000);
