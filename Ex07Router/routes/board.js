const express = require('express')


const router = express.Router()

router.get('/test', (req,res) =>{
    res.send('board 요청!')
})

router.post('/test', (req,res) =>{
    res.send('board 요청!')
})

module.exports = router