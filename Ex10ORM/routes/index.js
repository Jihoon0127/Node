const express = require('express')
const User = require('../models/user')
const router = express.Router()


// 1. ------------- 데이터 추가하기 -------------
router.post('/insert', async(req, res, next)=>{
    
    let {id, pw, age} = req.body // body안에 숨겨져있는 값들 데려오기
    console.log(req.body)

    try{
        // insert
       const result = await User.create({
            id : id,    // column : value
            pw : pw,
            age : age
        })
        res.json(result)
    } catch(err){
        next(err) // 에러를 다뤄주는 미들웨어 호출
    }
})

// 2. ------------- 데이터 가져오기 -------------
router.get('/select', async(req,res, next)=>{
    try{
        const result = await User.findAll() // 모두 찾아오기
        res.json(result)
    } catch(err){
        next(err)
    }
})

// 3. ------------- 조건 있는 -------------
router.get('/select/:id', async(req,res, next)=>{

    let reqId = req.params.id // 경로에 있는 값 가져오는 것은 params. 쿼리스트링이면 쿼리스트링

    try{
        const result = await User.findOne({ // 조건 있는 것 찾아오기
            where : {id : reqId},  // 조건 주기
            attributes : ['id', 'age']
        }) 

        res.json(result)

    } catch(err){
        next(err)
    }
})


// UPDATE : 모두 업데이트
// PATCH : 일부 업데이트 (data -> body)
router.patch('/update/;id', async(req, res, next) =>{
  try{
    const result = await User.update({
        pw : req.body.pw,
        age : req.body.age
    },{
        where : {id : req.params.id}
    })

    req.json(result)
  }catch(err){
        next(err)
    }
  })

  router.delete('/delete/:id', async(req,res,next) => {
    try{
      const result = await User.destroy({
            where : {id : req.params.id }
    })
    res.json(result)
    }catch(err){
        next(err)
    }
  })

module.exports = router