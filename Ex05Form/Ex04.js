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
    
        if(pathname === '/api/form'){
            const f = await fs.readFile('./Ex04.html')
             res.writeHead(200, {'Content-Type':'text/html; charset=UTF-8'})
             res.write(f)
             res.end()
        }
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
                
                console.log(data);
            let html = '<html>'
            html += '<body>'
            html += '<h3>'+data.id+'</h3>'
            
                if(data.pwd === data.pwd_verify){
                    html += "비밀번호가 일치합니다."
                }else{
                    html += "비밀번호가 일치하지 않습니다."
                }

         
            html += '<h3>'+data.gender+'</h3>'
            html += '<h3>'+data.bloodType+'</h3>'
            html += '<h3>'+data.hobby+'</h3>'
            html += '<h3>'+data.favorite_color+'</h3>'
            html += data.sayWords
            html += '</body>'
            html += '</html>'
     
             res.write(html)
             res.end()
            })
            
        }
    

    

})

server.listen(8888)
server.on('listening', ()=>{
    console.log('8888 번 포트에서 서버 연결 기다리는 중 ...');
})