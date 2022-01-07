// The Node REPL (Read Evaluation Print Loops)
// 한줄씩 실행가능하다는 뜻? REPL 환경으로 작성된 프로그램은 구간마다 실행된다.
// 커맨드 라인에서 node 만 실행한 경우

// node api를 사용하는 경우
const fs = require('fs');

// file2.txt 가 이미 있는 경우 덮어쓴다.
fs.copyFileSync("file1.txt", "file2.txt");

var superheroes = require("superheroes");

var mySuperHeroName = superheroes.random();

console.log(mySuperHeroName);
