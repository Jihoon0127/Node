const http = require('http')
const fs = require('fs').promises

const server = http.createServer(async(req,res)=>{
    
  const file = await fs.readFile('./Ex03.html') //async + await => 비동기

  res.writeHead(200, {'Content-Type' : 'text/HTMLAllCollection; charset=UTF-8'})
    res.write(file)
    res.end()
})

server.listen(8888)
server.on('listening', ()=>{
    console.log('8888 포트에서 서버연결 기다리는 중 ...');

})