const express = require('express')
const app = express()

app.get('/', (req,res) =>{
    // res.send('Hello Express!~') -> 텍스트 응답
    // 응답은 무조건 1번만
    // __dirname : 현재 위치 (Ex06Express 폴더 안)
    //         -> 정적리소스 위치 지정(html,css,js -> 화면,이미지)
    // 파일을 응답하고 싶을 떄 (경로)
    res.sendFile(__dirname+'/Ex02.html')
})

//set() : 값 설정(저장)
app.set('port', process.env.PORT || 8888)
app.listen(app.get('port'), () =>{
    console.log(app.get('port'), '번 포트에서 서버 연결 기다리는 중');
}) // = 8888