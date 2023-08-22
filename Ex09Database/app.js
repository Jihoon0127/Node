const express = require('express')
const nunjucks = require('nunjucks')
const indexRouter = require('./routes') // ./routes/index 와 같은 의미
// -> index는 첫번째 라는 의미. 만약 파일 이름이 index라면 생략가능
// 파일 이름을 안써주면  기본적으로 index로 잡아주기 때문
const app = express()



// html 문서 경로, 형식
app.set('views', __dirname+'/views') // view에 관련된 것들만 따로 모아줄 것임
// -> 경로 가지고 있는 변수 하나 생성했다~
app.set('view engine', 'html') // '기본적으로 view 엔진은 html로 쓸거다'는 뜻

// nunjucks 설정
nunjucks.configure('views', {
    express : app, // app 객체 연결
    watch : true // html파일이 연결되면 템플릿 엔진을 렌더링(화면에 보여주겠다!)
})
app.use(express.urlencoded({extended:true}))


app.use('/', indexRouter) // localhost:98888/...




app.set('port', process.env.PORT||8888)
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버연결 기다리는 중 ..')
})

