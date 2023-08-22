const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs =require('querystring')

const server = http.createServer(async(req, res)=>{
    // url 다루기! -> url 모듈 사용
    let reqUrl = req.url
    let pathname = url.parse(reqUrl, true).pathname

    console.log(req.method);

    // GET 방식일 때
    if(req.method === 'GET'){
        if(pathname === '/api/form'){
            const f = await fs.readFile('./Ex03getpost.html')
             res.writeHead(200, {'Content-Type':'text/html; charset=UTF-8'})
             res.write(f)
             res.end()
         } else if(pathname === '/api/login'){
            let queryData = url.parse(reqUrl, true).query
            res.writeHead(200, {'Content-Type':'text/html; charset=UTF-8'})
     
            let html = '<html>'
            html += '<body>'
            html += '<h3>'+queryData.id+'</h3>'
            html += '<h3>'+queryData.pw+'</h3>'
            html += '</body>'
            html += '</html>'
     
             res.write(html)
             res.end()
         }
    } else if(req.method === 'POST') {
        if(pathname === '/api/login'){
            let body = ''
            // data 이벤트(data가 들어오는 이벤트)가 발생하면 함수호출
            // 들어오는 데이터들을 하나로 묶어주는 작업
            req.on('data', function(data){
                body += data
            })
            
            // data가 이제 더이상 들어오지 않을 때 발생!
            req.on('end', function(){
                let data = qs.parse(body)

                res.writeHead(200, {'Content-Type':'text/html; charset=UTF-8'})
     
            let html = '<html>'
            html += '<body>'
            html += '<h3>'+data.id+'</h3>'
            html += '<h3>'+data.pw+'</h3>'
            html += '</body>'
            html += '</html>'
     
             res.write(html)
             res.end()
            })
            
        }
    }

    

})

server.listen(8888)
server.on('listening', ()=>{
    console.log('8888 번 포트에서 서버 연결 기다리는 중 ...');
})