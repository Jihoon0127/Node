// const express = require('express')
// const db_config = require('../config/database')

// const router = express.Router()

// let conn = db_config.init
// db_config.connect(conn)


// router.get('/', (req, res)=>{

//     let sql = "select * from andboard"
//     conn.query(sql, (err, rows)=>{
//         if(err){
//             console.log(err);
//             res.send('fail')
//         }else{
//             res.send(rows)
//         }
//     })

   
// })

// module.exports = router
const express = require('express');
const {v4:uuidv4}= require('uuid')
const fs = require('fs')
const db = require('../config/database');
const router = express.Router();

const conn = db.init();
db.connect(conn);

// Board
router.get('/', (req, res) => {
    let sql = 'select * from andboard';

    conn.query(sql, function (err, rows) {
        if (err) {
            console.log('에러 : ', err);
            res.send('Fail');
        } else {
            console.log("rows:", rows);
            console.log(req.body);
            res.send(rows);
        }
    });
});

router.post('/write', (req,res)=>{
    let {title, content, writer, img} = JSON.parse(req.body.board)
    // img파일 디코딩(base64)
    let decode = Buffer.from(img, 'base64') 

    const uuid = uuidv4() // 바로 랜덤한 이름 지정 -> 파일이름으로 사용
    // 파일 저장되는 기본경로 : 프로젝트 폴더 바로 아래(기준)
    fs.writeFileSync('public/img/board/'+uuid+'.jpg', decode) // 동기방식으로 파일 만들어줌

    var sql = "insert into andboard values (null, ?, ?, ?, ?, null)"
    conn.query(sql, [title, content, writer, uuid], (err, rows)=>{
        if(err) {
            console.log(err);
          res.send('Fail')
         } else {
            res.send('Success')
        }
    })
})

module.exports = router;