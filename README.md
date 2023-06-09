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

## 🏁 Router 요청

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

## 🔄 Streams & Buffers

```jsx
...

if (url === '/message' && method === 'POST') {
  const body = [];
  req.on('data', (chunk) => {
    console.log(chunk);
    body.push(chunk);
  }); // 특정 이벤트를 들을 수 있음 -> 데이터 이벤트가 발생하는 데에 버퍼가 도움을 준다
  req.on('end', () => {
    // 버퍼 사용 : 청크를 받은 후 다루기 위해서 / Buffer : 전역에서 사용 가능
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    fs.writeFileSync('message.txt', message);
  });
  res.statusCode = 302; // 응답 발생이 끝난후에도 이벤트 리스너는 계속 실행된다
  res.setHeader('Location', '/'); // setHeader('위치지정', 브라우저가 수락하는 디폴트 헤더')
  // res.writeHead('Location'); // 한번에 여러가지 메타정보를 작성할수있게한다, 상태코드 302
  return res.end();
}
```

### ⭐ Stream

> 지속적인 프로세스 : 노드가 요청을 한 청크씩 다 읽고나서, 요청 전체를 읽기까지 기다리지 않고도 각각
> 의 청크를 다룰 수 있음.
>
> 즉, **데이터가 들어오는 와중에도 앱이 실행되는 하드드라이브나 노드앱이 실행되는 서버에 쓸 수 있음
> .**

Node.js는 다 이런식으로 처리 : 데이터는 미리 다룰 수 있으나, 청크는 마음대로 다룰 수 없음!

### 🚌 Buffers

> 청크를 체계화 하기 위해 사용! 버정이랑 비슷하다~
>
> 여러개의 청크를 보유하고 파싱이 끝나기 전에 작업 할 수 있도록 한다

## 🥳 이벤트 기반 코드 실행의 대한 이해(`on`, `createServer`)

> Node.js는 함수를 함수안에 넣으면, 안에 넣은 함수를 나중에 실행! (비동기)

1. 응답 발송은 이벤트 리스너 실행이 끝났다는 의미가 아니다! **응답이 발송된 후에도 이벤트 리스너는계
   속 발생**

```jsx
req.on('end', () => {
  const parsedBody = Buffer.concat(body).toString();
  const message = parsedBody.split('=')[1];
  fs.writeFileSync('message.txt', message);
});
```

2. 동시에 이벤트 리스너의 응답에 영향을 줄 수 있는 어떠한 처리를 하는건 잘못된 설정 👉 1️⃣ 응답코드를
   이벤트 리스너 안에 넣어야한다

```jsx
// 1️⃣ 응답코드를 이벤트 리스너 안에 넣기
req.on('end', () => {
  const parsedBody = Buffer.concat(body).toString();
  const message = parsedBody.split('=')[1];
  fs.writeFileSync('message.txt', message);

  res.statusCode = 302;
  res.setHeader('Location', '/');
  return res.end();
});
```

3. 비동기 함수일때에는 Node.js가 해당 함수를 바로 실행하지 않고 코드를 처음 접햇을때 내부적으로 이벤
   트 리스너를 하나 추가한다. (Node.js는 모든 리스너들을 내부적으로 관리한다.)

   ```jsx
   // 이경우에는 req.on의 end 이벤트가 자동으로 실행
   req.on('end', () => {
      ...
   })
   ```

4. 실행 완료 후 해당 함수를 대신 호출해줌 (Node.js에 이벤트와 이벤트 리스너가 적힌 명부가 있다!!) 위
   코드의 콜백함수가 리스너라고 생각하면 편하다!

5. Node.js가 요청 분석을 완료한 후, 명부(registry)를 보면서 "요청을 다 처리 했으니 이제 `end` 이벤트
   를 발송하려면 이벤트의 리스너를 봐야겠다!!" 라고 생각해서 (위의 경우에서는)**콜백함수**와 등록했
   던 **다른 함수를 호출**

```markdown
반환 응답 : 1️⃣ `if(url === '/message' && method === 'POST')`을 이 함수 : `return res.end()`로 옮긴경
우

1. (1️⃣ if문)에 도달해서 조건이 맞는다면 그 안으로 들어감
2. 두 핸들러를 등록 `req.on('data',...)`, `req.on('end',...)` : 이 두 함수를 바로 실행하지 않음
3. 함수가 내부적으로 이벤트 이미터에 등록
4. 바로 다음 줄로 넘어감

## 🔜 이런 설정이 중요한 이유

⭐ Node.js가 파일 작성완료 전까지 멈추는데 그러면 서버가 느려지고 완료되기 전까지 들어오는 요청을 포
함해 아무것도 할 수 없기 때문!!!
```

6. 결론!!!  
   하단 코드에 너무 빨리 도달하지 않게 `return`을 붙여서 먼저 실행되도록 한다!!!! (하단코드는 실행안
   됨ㅋ)

```jsx
{
  ...
  ...
  return req.on('end', () => {
    // 버퍼 사용 : 청크를 받은 후 다루기 위해서 / Buffer : 전역에서 사용 가능
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    // writeFIleSync : 코드 실행을 막는 메서드 (파일이 완료될때까지 다음 코드를 실행하지 않는 동기화 모드)
    fs.writeFileSync('message.txt', message);

    res.statusCode = 302;
    res.setHeader('Location', '/'); // setHeader('위치지정', 브라우저가 수락하는 디폴트 헤더')
    return res.end();
  });

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<bode><h1>server start</h1></bode>');
  res.write('</html>');
  res.end();
}
```

`writeFileSync` : 코드 실행을 막는 메서드 (파일이 완료될때까지 다음 코드를 실행하지 않는 동기화 모드
)

```

```
