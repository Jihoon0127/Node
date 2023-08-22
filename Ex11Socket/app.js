const express = require('express')
const nunjucks = require('nunjucks')
const webSocket = require('./socket')
const indexRouter = require('./routes')

const app = express()

 // view 관련 설정
app.set('views', __dirname+'/views')
app.set('view engine', 'html')

nunjucks.configure('views', {
    express : app,
    watch : true
})

// 루트 요청 시 index router로 보내주기
app.use('/', indexRouter)

app.set('port', process.env.PORT||8888)
const server = app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버연결 기다리는 중...')
})

webSocket(server)