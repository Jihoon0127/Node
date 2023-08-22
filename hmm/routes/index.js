const express = require("express");
const db = require("../config/database");
const router = express.Router()

const conn = db.init(); 
db.connect(conn);

router.post('/login', (req, res)=>{
    // console.log(req.body.AndMember);
  // json 그자체로 들어오므로 jsonObject로 바꿔야함
  let andmember = JSON.parse(req.body.AndMember); 

    let inputId = andmember.id
    let inputPw = andmember.pw

    var sql = 'select id,pw from andmember where id=? AND pw=?' // ? : 바뀌는 자리는 물음표로 쓰기

    conn.query(sql, [inputId, inputPw], function(err, rows){
   
        if(err){
            res.send('Fail')
            console.log(err);
        } else {
            if(rows.length>0){
                console.log("로그인 성공!");
                console.log(req.body);
                res.send(rows)
            } else {
                console.log("로그인 실패");
                res.send('Fail')
            }
            
        }
    }) 
 })


// outer.post('/login', (req, res)=>{
   
//   let andmember = JSON.parse(req.body.AndMember); 

//     let inputId = andmember.id
//     let inputPw = andmember.pw

//     let sql = 'select id,pw from andmember where id=? AND pw=?' // ? : 바뀌는 자리는 물음표로 쓰기

//     conn.query(sql, [inputId, inputPw], function(err, rows){
    
//         if(err){
           
//             console.log(err);
//         } else {
//             if(rows.length!=0){
             
//                 console.log("로그인 성공!");
//                 res.send('Success')
//             } else {
//                 console.log("로그인 실패");
//                 res.send('LoginFail')
//             }
            
//         }
//     }) 
//  })

module.exports = router