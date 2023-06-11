// 1. 서버 생성해보기

// 1-1. 코어 모듈
const http = require('http');
const routes = require('./routes');

console.log(routes.someText);

// CreateServer(requestListener?:(request : 들어오는 모든 요청을 실행하는 기능))
// 서버를 생성할때 필요한 메서드 -> 모든 요청을 받을때에는 소괄호 쓰지말걸아
// http.createServer(rqListener);
const server = http.createServer(routes.handler);

// listen(port, hostname) : Node가 스크립트를 바로 종료하지않고 계속 실행되면서 듣도록 한다.
server.listen(3000);
