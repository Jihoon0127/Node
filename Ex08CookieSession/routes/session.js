const express = require('express')
const router = express.Router()


// 1. -------- 세션 생성 --------
router.get('/setsession', (req, res)=>{
    // 세션을 생성하기 위해서는 사용자를 구별해야 하는데, 이를 위해 필요한 것은 id값.
    // 이 id값을 가지고 있는 곳은 클라이언트
    // 이 id값을 클라이언트가 서버에게 보내줌 == 클라이언트->서버 방향이니까 request!!
    req.session.nickname = 'newNick'
    //          key값    =  value값
    req.session.lunch = '닭강정'

    res.send('세션 생성')
})


// 2. -------- 세션 확인 --------
router.get('/getsession', (req, res)=>{
    res.send(req.session.nickname+","+req.session.lunch) 
    // req.session.nickname : 세션 값 확인한다는 뜻
    // req.session.nickname = 'newNick' : '=' 얘 쓰면 세션 생성한다는 뜻.
})


// 3. ------- 세션 삭제 --------
router.get('/deletesessions', (req, res)=>{
    req.session.destroy() // 현재 저장돼있는 사용자 정보 모두 삭제
    res.send('세션 삭제')
})


module.exports = router