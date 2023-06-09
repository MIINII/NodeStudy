const fs = require('fs'); // require : 노드 코어 모듈 불러오기, fs:FileSystem

fs.writeFileSync('hello.txt', 'hello from Node.js'); // writeFileSync : 하드 드라이브에 파일을 생성
