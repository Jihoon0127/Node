const express = require('express')
const router = express.Router()
const Member = require('../models/member')


router.post('/login', async(req, res, next)=>{
   try {
    const{id ,pw} = req.body;

    const member = await Member.findOne({where : {id, pw}, attributes: ['id', 'nick']});

    if(member){
        req.session.member = member;
        res.redirect('/rooms')
    }else{
        res.redirect('/r')
    }
   } catch (err) {
        next(err)
   }
   
});

module.exports = router
