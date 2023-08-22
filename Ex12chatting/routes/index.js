const express = require('express')
const Room = require('../models/room')
const router = express.Router()

// 첫페이지(login.html)
router.get('/', (req,res) =>{
    res.render('login')//login.html 랜더링

})

// // rooms.html (db에서 채팅방 데이터 불러오기)
// router.get('/rooms', (req, res)=>{

//     // room 테이블에 있는 모든 데이터
//     // console 에 출력

//     res.render('rooms')
    
// })

router.get('/rooms', async(req,res, next)=>{
    
    try{
        const rooms = await Room.findAll() // 모두 찾아오기
        // res.json(result)
        console.log(rooms);
        res.render('rooms', {rooms:rooms})
    } catch(err){
        next(err)
    }
    
})

module.exports = router
