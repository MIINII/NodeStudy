const fs = require('fs');

const requestHandler = (req, res) => {
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
    return req.on('end', () => {
      // 버퍼 사용 : 청크를 받은 후 다루기 위해서 / Buffer : 전역에서 사용 가능
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // writeFIleSync : 코드 실행을 막는 메서드 (파일이 완료될때까지 다음 코드를 실행하지 않는 동기화 모드)
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/'); // setHeader('위치지정', 브라우저가 수락하는 디폴트 헤더')
        return res.end();
      });
    });
  }

  // 아래 코드가 먼저 실행 될 수도 있다! (위에 리턴이 없을경우!)
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<bode><h1>server start</h1></bode>');
  res.write('</html>');
  res.end();
};

// module.exports = requestHandler;

module.exports = {
  handler: requestHandler,
  someText: 'test txt',
};
