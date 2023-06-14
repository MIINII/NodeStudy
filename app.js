const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

// express
const app = express();

// routes
const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');

// 🧪 분석기
// 요청이 어디로 향하든 본문 분석이 이루어지게 하기 위해
app.use(bodyParser.urlencoded({ extended: false }));

// 순서중요!
app.use(adminRouters);
app.use(shopRouters);

// server
const server = http.createServer(app);
server.listen(3000);
