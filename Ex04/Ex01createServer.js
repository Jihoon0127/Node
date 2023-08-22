const http = require('http')

http.createServer((req,res)=>{
    // 요청 : 클라이언트에서 localhost:9999 로 요청이 들어오면!

    // 응답 : html 문서를 만들어서 응답
    // (응답 데이터 형식 지정, 인코딩)

    //HTTP 상태코드(요청과 응답이 정상(200 OK), 요청이 잘못왔다(404), 서버 로직 오류(500)... -> 숫자로 표기)
    
    res.writeHead(200, {'Content-Type' : 'text/html; charset=UTF-8'})
    let data = '<html>'
    data += '<body>'
    data += '<h1>Hello Node!</h1>'
    data += '</body>'
    data += '</html>'

    res.write(data)
    res.end() // 응답 끝
}).listen(8888, ()=>{
    console.log('8888번 포트에서 서버 연결 기다리는중 ...');
})
