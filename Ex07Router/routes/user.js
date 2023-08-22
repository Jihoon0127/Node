// router사용
const express = require('express')
const router = express.Router() // 라우터 인스턴스 생성

// /user/test
router.get('/test',(req,res)=>{
    res.send('user 요청!')
})

module.exports = router

