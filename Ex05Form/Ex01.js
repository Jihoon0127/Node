const http = require('http')
const fs = require('fs').promises
const url = require('url')


const server = http.createServer(async(req,res)=>{
    // url 다루기! -> url 모듈 사용
    let reqUrl = req.url
    let pathname = url.parse(reqUrl, true).pathname
    let result;
  


    if(pathname ==='/form'){
      const f =  await fs.readFile('./Ex01.html')
      res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
      res.write(f)
      res.end()
    }else if(pathname ==='/home'){
      let queryData = url.parse(reqUrl, true).query  //query,data(사용자가 입력한 값)
      

      if(queryData.abc ==="+"){
        result = parseInt(queryData.query) + parseInt(queryData.data)
     }else if(queryData.abc ==="-"){
         result = parseInt(queryData.query-queryData.data)
     }else if(queryData.abc === "*"){
         result = parseInt(queryData.query*queryData.data)
     }else if(queryData.abc === "/"){
         result = parseInt(queryData.query/queryData.data)
     }
      
      res.writeHead(200,{'Content-Type' : 'text/html; charset=UTF-8'})
      let html ='<html>'
      html+='<body>'
      html+= result 
      html+='</body>'
      html +='</html>'

      res.write(html)
      res.end()
    }
})

server.listen(8888)
server.on('listening', ()=>{
    console.log('8888번 포트에서 서버 연결 기다리는 중...');
})