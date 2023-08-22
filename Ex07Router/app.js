const express = require('express')
const userRouter = require('./routes/user') //user.js 모듈
const boardRouter = require('./routes/board') //board.js 모듈
const app = express()

app.use( '/user' , userRouter) // localhost:8888/user
app.use( '/board' , boardRouter) // localhost:8888/board





app.set('port', process.env.PORT||8888)
app.listen(app.get('port'), () =>{
    console.log(app.get('port'), '번 포트에서 서버 연결 기다리는 중 ...');
})