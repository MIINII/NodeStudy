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
3. `fs`
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
    fs.writeFile('message.txt', message);

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

## ⛔ Blocking & NoneBlocking Code

> Node.js는 논블로킹 방식으로 코드가 진행된다!

### 실행 순서

1. 수많은 콜백과 이벤트를 등록해두면 특정 작업이 끝난후에 Node.js가 해당 코드를 실행시킴
2. js 스레드는 항상 새 이벤트나새로 들어오는 요청을 다를 수 있음!
3. 작업이 없으면 프로그램을 끝낸다! `서버에서는 그럴 일이 없음 : 이벤트 리스너가 있기때문에`

- **parameter**
  - `file` : 저장할 파일의 경로, 파일명, 확장자명을 기입
  - `data` : 파일에 기록될 데이터 양식
  - `options`
    - `encoding` : 파일의 인코딩을 지정하는 문자열 (default : utf8)
    - `mode` : 파일 모드를 지정하는 정수값 (default : 0o666)
    - `flag` : 파일에 쓰는 동안 사용되는 플래그를 지정하는 문자열(default : w)
  - `callback` : 메소드가 실행될떄 호출되는 함수
    - `err` : 작업에 실패하면 반환되는 오류

---

### ❓ `writeFileSync(file,data,options)`

코드 실행을 막는 메서드 (파일이 완료될때까지 다음 코드를 실행하지 않는 **_동기_**화 모드 ) **매우 짧
은파일의 코드**에서만 사용하길 권장!!

> ❔ `🔪만약` 엄청 **큰 용량의 파일을 읽거나 복사**하는 등의 상황에서 <u>코드 실행을 막는경우</u>?
>
> ❗ 다음 줄과 다른 모든 코드가 파일 운영이 완료될때까지 **🛑실행을 멈춤🛑** + 새로 유입되는 **요청
> 들도 취급되지 않음** 👉 `writeFile` 사용

```jsx
{
  ...
  ...
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
```

### ❓ `writeFile(file, data, options, callback)` 을 사용해야 하는 이유!!

- 🌟 지정된 데이터를 파일에 비동기적으로 쓰는데 사용
- 경로와 데이터를 받아들일 뿐만 아니라 세번째 인수인 콜백까지도 포함한다!!
- 파일이 있으면 대체된다!
- '옵션' 파라미터는 메서드의 기능을 수정하는데 사용 가능!

노드는 암묵적으로 이벤트 리스너를 등록시킵니다.

```jsx
return req.on('end', () => {
  const parsedBody = Buffer.concat(body).toString();
  const message = parsedBody.split('=')[1];

  fs.writeFile('message.txt', message, (err) => {
    // 아래 응답은 파일 작업이 완료된 경우에만 전송되어야함! 당연!
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  });
});
```

## 🏧 Module 시스템

> 파일 내용의 캐시가 저장되고 외부에서 수정할수 ❌ 👉 원본 수정 불가능 , 외부에서 읽을 수 있는 내용
> 만 내보낸다

1. 모듈 하나만 내보내기
   1. ```jsx
      module.exports = requestHandler;
      ```
2. 모듈 여러개 내보내기
   1. ```jsx
      module.exports = {
        handler: requestHandler,
        someText: '시험용 텍스트',
      };
      ```
   2. ```jsx
      (module.)exports.handler = requestHandler;
      (module.)exports.someText = '시험용 텍스트';
      ```

# 💁 5강 : Express.js작업 (frameWork)

## ⚙️ Setting

```shell
yarn init
```

### 😈 Nodemon 설치

> 서버를 수동으로 재시동하지 않아도 되게하는 패키지

```shell
npm install -g nodemon
```

### 🚅 Express.js 설치

```shell
// npm
npm install --save express

// yarn
yarn add express
```

👉 `--save` : 프로덕션 의존성 (실행하게될 모든 서버와 컴퓨터에 설치되어야함!!!)

---

## 🚆 Express.js

> 필수적인 작업이라던가 신경쓰고 싶지않은 세부내용을 외부에 맡길 수 있게 도와주고, 일련의 규칙과 더
> 욱 깔끔한 코드를 작성하고 핵심적인 작업에 집중할 수 있게 도와주는 유틸리티 함수 제공

- 파싱을 대신해 주기 위한 패키지를 쉽게 설치하게 도와준다~
- 애플리케이션을 정의하는 코드. 즉, 다른 애플리케이션으로부터 차별화하는 요소
- 무거운 작업은 다 프레임 워크가 해줌~ㅋ

Express.js는 `1) 미들웨어`와 연관이 되어있음. ❗서드파티 패키지를 쉽게 Express.js에 장착하여 특정 기
능을 추가❗

## 🖕 미들웨어

> 들어오는 요청을 `express.js`에 의한 다양한 함수를 통해 자동으로 이동  
> (= 단일 요청 핸들러를 보유하는 대신 응답을 전송하기 전까지 요청이 통과하게 될 다양한 함수들을 연결
> 할가능성 확보 👉 하나의 함수를 사용하여 처리하기보다는 코드를 조각들로 분할할수 있는것이
> Express.js의특징)

- 상단에 있는 미들웨어가 먼저 실행되며 하단으로 갈수록 나중에 실행
- next를 호출 여부에 따라 다음 <u>**미들웨어가 실행될 수도 있고 실행되지 않을 수도 있다.**</u>
- 미들웨어는 여러개 선언 될 수 있음.

---

## ✏️ Express 본격 사용해보기

```jsx
const express = require('express');
const app = express();

// 1. 미들웨어 사용방법
// use : 새로운 미들웨어 함수 추가
app.use((req, res, next) => {
  // 다음 미들웨어로 요청이 이동할 수 있게 실행되어야함
  console.log('In the Middleware');
  next();
});
```

### `app.use()`

```jsx
// 이 부분이 미들웨어 함수 영역
(req, res, next) => {
  console.log('In the Middleware');
  next();
};
```

#### `next()`

> 미들웨어 함수에 대한 콜백 파라미터.  
> `next()`를 작성하게 되면 다음 미들웨어 함수가 호출됨
