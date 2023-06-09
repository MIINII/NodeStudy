// 1. 서버 생성해보기

// 1-1. 코어 모듈
const http = require('http');

// requestListener(req, res) : 들어오는 메세지 또는 응답 객체 유형의 요청을 받는다
// (= Node.js가 자동으로 들어오는 요청을 대변하는 객체를 제공하고 해당 요청으로 부터 데이터를 읽을 수 있게끔하며, 요청을 보낸 사람에게 응답을 보낼 수 있는 응답객체를 준다)
function rqListener(req, res) {}

// CreateServer(requestListener?:(request : 들어오는 모든 요청을 실행하는 기능))
// 서버를 생성할때 필요한 메서드 -> 모든 요청을 받을때에는 소괄호 쓰지말걸아
// http.createServer(rqListener);
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // process.exit(); // 대게 사용할 일이 없다~~

  // setHeader(String Name, String Value)
  res.setHeader('Content-Type', 'text/html');

  // write
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<bode><h1>server start</h1></bode>');
  res.write('</html>');

  res.end(); // 이밑으로 아무것도 적으면 안된다
});

// listen(port, hostname) : Node가 스크립트를 바로 종료하지않고 계속 실행되면서 듣도록 한다.
server.listen(3000);
