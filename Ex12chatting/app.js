const express = require('express')
const indexRouter = require('./routes') // ./routes/index
const member = require('./routes/member')
const chatRouter = require('./routes/chat')
const nunjucks = require('nunjucks')
const {sequelize} = require('./models')
const session = require('express-session')
const bodyParser = require('body-parser')
const webSocket = require('./socket')
const fileStore = require('session-file-store')(session)
const app = express()

// force : false -> 기존 테이블은 건들지 않음
sequelize.sync({force : false})
.then(()=>{
    console.log("DB 연결성공!");
})
.catch((err)=>{
    console.log(err);
})
// 정적리소스 경로 지정(css, js(front-end) ...)
app.use(express.static(__dirname+ "/public"))

app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json()) // json 형태 데이터 다룰 떄 추가!
app.use(session({
    httpOnly : true,      // 'http 통신 할 때만 허용'
    secret : 'secretkey', // 암호화 키설정
    resave : false,       // 세션에 수정사항이 없더라도 다시 저장할 것인지? - false:다시 저장안함
    cookie : { // 추가적으로 쿠키에 설정하고 싶은 게 있으면 추가 가능
        httpOnly : true
    },
    store : new fileStore()
}))

app.set('views', __dirname +'/views')
app.set('view engine', 'html')
nunjucks.configure('views',{
    express : app,
    watch : true
})

app.use('/', indexRouter)
app.use('/member', member)
app.use('/chat', chatRouter)

app.set('port', process.env.PORT||8888)
const server = app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버연결 기다리는 중 ..')
})

webSocket(server, app)