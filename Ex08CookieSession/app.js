const express= require('express')
const cookieRouter = require('./routes/cookie')
const sessionRouter = require('./routes/session')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const fileStore = require('session-file-store')(session)

app.use(cookieParser('secretkey')) // 쿠키 암호화 키 설정
app.use(session({
    httpOnly : true,      // 'http 통신 할 때만 허용'
    secret : 'secretkey', // 암호화 키설정
    resave : false,       // 세션에 수정사항이 없더라도 다시 저장할 것인지? - false:다시 저장안함
    cookie : { // 추가적으로 쿠키에 설정하고 싶은 게 있으면 추가 가능
        httpOnly : true
    },
    store : new fileStore()
}))

app.use('/c', cookieRouter) // localhost:8888/c/...
// -> 앞에 c로 시작하는 모든 요청들은 cookieRouter에서 수행하겠다!
app.use('/s', sessionRouter) // localhost:8888/s/...


app.set('port', process.env.POST||8888)
app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 서버 연결 기다리는 중 ..');
})