// 1. 서버 생성해보기

// 1-1. 코어 모듈
const http = require('http');
const fs = require('fs');

// requestListener(req, res) : 들어오는 메세지 또는 응답 객체 유형의 요청을 받는다
// (= Node.js가 자동으로 들어오는 요청을 대변하는 객체를 제공하고 해당 요청으로 부터 데이터를 읽을 수 있게끔하며, 요청을 보낸 사람에게 응답을 보낼 수 있는 응답객체를 준다)
function rqListener(req, res) {}

// CreateServer(requestListener?:(request : 들어오는 모든 요청을 실행하는 기능))
// 서버를 생성할때 필요한 메서드 -> 모든 요청을 받을때에는 소괄호 쓰지말걸아
// http.createServer(rqListener);
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Msg</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input name="message" type="text"><button type="submit">submit</button></button></input></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    // 특정 이벤트를 들을 수 있음 -> 데이터 이벤트가 발생하는 데에 버퍼가 도움을 준다
    req.on('end', () => {
      // 버퍼 사용 : 청크를 받은 후 다루기 위해서 / Buffer : 전역에서 사용 가능
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // writeFIleSync : 코드 실행을 막는 메서드 (파일이 완료될때까지 다음 코드를 실행하지 않는 동기화 모드)
      fs.writeFileSync('message.txt', message);

      res.statusCode = 302;
      res.setHeader('Location', '/'); // setHeader('위치지정', 브라우저가 수락하는 디폴트 헤더')
      return res.end();
    });
  }

  // 아래 코드가 먼저 실행 될 수도 있다! (위에 리턴이 없을경우!)
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<bode><h1>server start</h1></bode>');
  res.write('</html>');
  res.end();
});

// listen(port, hostname) : Node가 스크립트를 바로 종료하지않고 계속 실행되면서 듣도록 한다.
server.listen(3000);
