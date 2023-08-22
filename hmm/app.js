// const express = require('express')
// const app = express()
// const boardRouter = require('./routes/board')
// const indexRouter = require('./routes')


// app.use(express.urlencoded({extended:true}))

// app.use('/board', boardRouter)
// app.use('/index', indexRouter)

// app.set('port', process.env.PORT||8888)
// app.listen(app.get('port'), () =>{
//     console.log(app.get('port'), '번 포트에서 서버연결 기다리는중 ...');
// })

const express = require('express')
const indexRouter = require('./routes')
const boardRouter = require('./routes/board')
const app = express()

app.use(express.urlencoded({extended:true}))

app.use('/', indexRouter)
app.use('/board', boardRouter)

app.set('port', process.env.PORT||8888)

const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 서버 연결 기다리는 중...');
})