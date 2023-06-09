# 🖥 NODE.js

> 사용자에게 데이터를 회신하는 코드를 서버에서 작성해서 클라이언트가 사용하게

## :mouse_trap: 노드의 사용처

1. 🌟 서버 운용 : 서버 자체를 스스로 작성하게..? 코드가 들어오는 요청을 처리해서 다른 코드로 보내준
   다.
2. 비즈니스 로직을 운용 : 요청받은 데이터 처리, 데이터베이스 활용 등...
3. 응답 사이드도 처리 : 들어오는 요청만이 아니라 클라이언트에게 데이터를 회신할수도 있음

```js
//기본 사용 방법
const fs = require('fs'); // require : 노드 코어 모듈 불러오기, fs:FileSystem

fs.writeFileSync('hello.txt', 'hello from Node.js'); // writeFileSync : 하드 드라이브에 파일을 생성
```

## :pen: 노드 강의 순서

- [#3 | 기본개념이해](https://kmooc.udemy.com/course/nodejs-mvc-rest-apis-graphql-deno/learn/lecture/30288790#overview)
- #5 | express.js작업
- #6 | ejs부분

### :blue_book: REPL(Read, Eval, Print, Loop)

- Read : 사용자 입력값을 읽기
- Evaluate : 사용자 입력값을 평가
- Print : 결과값 출력
- Loop : 새로운 입력값 기다림

---

# 💁 3강 : 노드 기본 개념 이해

## 🕸 웹 작동 방식

응답과 요청은 모두 `header`를 가지고 있다.

- `header` : 응답, 요청에 첨부되는 메타 데이터로 내용이 무엇인지 알려준다
- HTTP / HTTPS : 유효한 요청이 어떤형태를 지니고 어떤 데이터가 전송되어야할지 정의

## 🪛 Node 서버 생성해보기

```jsx
// app.js
const http = require('http');

// CreateServer(requestListener?:(request : 들어오는 모든 요청을 실행하는 기능))
// 서버를 생성할때 필요한 메서드 -> 모든 요청을 받을때에는 소괄호 쓰지말걸아
// http.createServer(rqListener);
const server = http.createServer((req, res) => {
  console.log(req);
});

// listen(port, hostname) : Node가 스크립트를 바로 종료하지않고 **계속 실행**되면서 듣도록 한다.
server.listen(3000);
```

`node app.js`

## ⛑️ 코어 모듈

1. `http` -> 서버를 출시하거나 요청을 보내는것과 같은 작업에 도움, 여러 서버간에 소통 가능
2. `https` -> 모든 전송 데이터가 암호화되는 SSL 암호화 서버를 출시하는데 도움
3. `fs` ->
4. `path`
5. `os`

## 🛼 요청 객체 다루기

```jsx
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
});
```

## 📫 응답 전송

> `GET`메서드를 기본으로 사용한다

`setHeader(StringName, StringValue)` -> name 헤더의 값을 Value로 지정한다

```jsx
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  // process.exit(); // 대게 사용할 일이 없다~~

  // setHeader(String Name, String Value)
  res.setHeader('Content-Type', 'text/html');

  // write
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<bode><h1>헬로</h1></bode>');
  res.write('</html>');

  res.end(); // 이밑으로 아무것도 적으면 안된다
});
```

## 🔄 Router 요청

- `writeFileSync`
- `setHeader('위치지정', 브라우저가 수락하는 디폴트 헤더')` 👉 `'/'`로 설정하게 되면 이미 실행중인호
  스트를 자동으로 사용하게 된다
- `writeHead`

```jsx
...
  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMMY');
    res.statusCode = 302;
    res.setHeader('Location', '/'); // setHeader('위치지정', 브라우저가 수락하는 디폴트 헤더')
    // res.writeHead('Location'); // 한번에 여러가지 메타정보를 작성할수있게한다, 상태코드 302
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<bode><h1>server start</h1></bode>');
  res.write('</html>');
```

## Streams & Buffers

### Stream

> 지속적인 프로세스 : 노드가 요청을 한 청크씩 다 읽고나서, 요청 전체를 읽기까지 기다리지 않고도 각각
> 의 청크를 다룰 수 있음.
>
> 즉, **데이터가 들어오는 와중에도 앱이 실행되는 하드드라이브나 노드앱이 실행되는 서버에 쓸 수 있음
> .**

Node.js는 다 이런식으로 처리 : 데이터는 미리 다룰 수 있으나, 청크는 마음대로 다룰 수 없음!

### Buffers

> 청크를 체계화 하기 위해 사용! 버정이랑 비슷하다~
>
> 여러개의 청크를 보유하고 파싱이 끝나기 전에 작업 할 수 있도록 한다
