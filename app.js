// 2. express 사용해보기

// Module
const http = require('http');

// Express
const express = require('express');

const app = express();

// use : 새로운 미들웨어 함수 추가
app.use((req, res, next) => {
  // 다음 미들웨어로 요청이 이동할 수 있게 실행되어야함
  console.log('In the Middleware');
  next();
});

app.use((req, res, next) => {
  // 다음 미들웨어로 요청이 이동할 수 있게 실행되어야함
  console.log('In Another Middleware');
  res.send('<h1>Hello from Express!</h1>');
});

const server = http.createServer(app);

server.listen(3000);
