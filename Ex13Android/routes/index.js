const express = require("express");
const db = require("../config/database");
const router = express.Router();

// mysql DB 사용
const conn = db.init(); // 연결 객체생성, 반환
db.connect(conn);

// 회원가입
// http://172.30.1.22:8888/join
// 안드로이드와 로컬호스트통신 안됨.
router.post("/join", (req, res) => {
  console.log(req.body.AndMember);
  // json 그자체로 들어오므로 jsonObject로 바꿔야함

  const { id, pw, tel, birth } = JSON.parse(req.body.AndMember);

  let sql = 'insert into andmember values (?, ?, ?, ?)'

  conn.query(sql, [id, pw, tel, birth], (err, rows, fields) => {
    // 오류일 때
    if (err) {
      console.log(err);     
    } else {
        console.log(rows);
        if(rows.affectedRows>0){
            console.log("회원가입 성공!");
            res.send("Success");
          } else {
            res.send("Fail");
          }
    }
  });
});


// 로그인 할 때!
router.post('/login', (req, res)=>{
    // console.log(req.body.AndMember);
  // json 그자체로 들어오므로 jsonObject로 바꿔야함
  let andmember = JSON.parse(req.body.AndMember); 

    let inputId = andmember.id
    let inputPw = andmember.pw

    let sql = 'select id,pw from andmember where id=? AND pw=?' // ? : 바뀌는 자리는 물음표로 쓰기

    conn.query(sql, [inputId, inputPw], function(err, rows){
    // [] : 물음표에 들어갈 값 써주기. = id 변수만 넣어주면 됨
        if(err){
            //에러일 때
            console.log(err);
        } else {
            if(rows.length!=0){
                // console.log('rows결과값: ' , rows);
                console.log("로그인 성공!");
                res.send('Success')
            } else {
                console.log("로그인 실패");
                res.send('LoginFail')
            }
            
        }
    }) 
 })


module.exports = router;