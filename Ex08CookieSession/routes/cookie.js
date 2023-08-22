const express = require('express')
const router = express.Router()

// 1. ------ 쿠키 생성 --------
router.get('/setcookie', (req, res)=>{
    let nick = 'nickname1'
    // nick이 담긴 쿠키 생성하기
    // 1. 서버에서 생성 -> 클라이언트로 응답 시 포함 
    res.cookie('nickname' , nick, { // response의 쿠키 객체 생성
     // (key값-구분값/구분할 이름 , value값-실제 저장할 값)
        maxAge : 100000000, //만료기간설정 (ms단위 : 1000ms==1s)
        signed : true       // 쿠키서명 == 암호화
    }) 

    res.cookie('lunch', '닭강정', { // 오늘 날짜&시각을 가진 객체
        expires : new Date(Date.now() + 1000*60*60*24)  // 하루 후 만료
    })

    res.send('쿠키 생성')
})


// 2. ------- 쿠키 값 확인하기 ------- 
router.get('/getcookies', (req, res)=>{
// 클라이언트가 가진 쿠키를 서버에서 확인하는 것이니, request!
    console.log(req.cookies)        // 서명이 안된 쿠키만 가지고 올 수 있음
    // console.log(req.cookies.lunch)
    console.log(req.signedCookies.nickname) // 서명된 쿠키 가져오기
    // console.log(req.signedCookies)
})


// 3. ------- 쿠키 삭제 --------
router.get('/deletecookie', (req, res)=>{
    res.clearCookie('lunch') // 삭제하고 싶은 쿠키 하나 선택
    res.send('쿠키 삭제')     // 응답 - 문구 하나 보내기
})


module.exports = router