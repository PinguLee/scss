const fs = require('fs');
const http = require("http");
const pokemon = require('pokemon');
const pokemonList = pokemon.all('ko');
let liList = [];

for (let i = 0; i < pokemonList.length; i++) {
  liList += `<li>${pokemonList[i]}</li>`;
}

console.log(liList);

let doc =
  `<!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style></style>
  </head>
  <body>
    ${liList}
  </body>
</html>`;

fs.writeFile('./index.html', doc, (err) => {
  if (err) {
    console.log('에러 : ', err);
  }
});

http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' })

  fs.readFile("./index.html", function (err, data) {
    if (err) {
      console.error("파일을 읽지 못했습니다.");
    } else {
      response.end(data);
    }
  });
}).listen(8080);