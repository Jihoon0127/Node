const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('index') // index.html 보여주기
})

module.exports = router