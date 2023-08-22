const express = require('express')

// DB 모듈 가져오기
const db = require('../config/database') 
const router = express.Router()

const conn = db.init() // db가 가진 기능 중 init 호출 <= 연결 객체 생성&반환
db.connect(conn) // db의 기능 중 connect호출 <= 연결

/* 
DB에 있는 값이 계속해서 달라지고 있어서 정적리소스로 데려올 수 없음 (Ex06Express와 비교해서 보기)
router.get('/select', (req, res)=>{ 
    // 템플릿엔진 : html 양식(템플릿) + 데이터 -> 결과 문서(nunjucks)
    // ==> 데이터를 가져와서 화면에 뿌려주는 양식!
    // == 가지고 온 데이터를 활용해서 화면 렌더링
    res.render('index')
})
*/


// 1. --------- 전체 DB 연결정보 가져오기 ----------
router.get('/select', (req, res)=>{ 
    // 템플릿엔진 : html 양식(템플릿) + 데이터 -> 결과 문서(nunjucks)
    // ==> 데이터를 가져와서 화면에 뿌려주는 양식!
    // == 가지고 온 데이터를 활용해서 화면 렌더링

    let sql = 'select * from member'
    
    //        (sql실행,     결과처리)
    conn.query(sql, function(err, rows, fields){  
            //err-오류처리 , rows-select결과(데이터), fields-결과 외의 메타데이터
            // console.log(err);
            // console.log(rows);    -> 실제 내가 보내줄/필요한 데이터!
            // console.log(fields);  -> 부가적인 속성 및 데이터들

            res.render('index', {list : rows}) 
                        // {rows의 키값 : 실제보낼데이터-value값}
    }) 
})




// 2. -------- 버튼 클릭시 개별 회원정보 가져오기 --------
router.get('/select/:id', (req, res)=>{
    let id = req.params.id // params의 id만 변수에 저장해주기

    let sql = 'select * from member where id=?' // ? : 바뀌는 자리는 물음표로 쓰기

    conn.query(sql, [id], function(err, rows, fields){
    // [] : 물음표에 들어갈 값 써주기. = id 변수만 넣어주면 됨
        console.log(rows)

        
        

        // json 형태로 데이터를 응답 : json기본구조 - {key값 : value값}
        res.json({member : rows})

    }) 
 })


 // 3. ------------- 회원 추가 ----------------
router.post('/insert', (req,res)=>{
    // 사용자가 입력한 id,pw,nick (POST->BODY) -> body parsing할 수 있도록 설정해야 함 : app.js에서 파싱하기!
    let {id, pw, nick} = req.body

    let sql = 'insert into member values (?,?,?)'

    
    conn.query(sql, [id, pw, nick], function(err, rows, fields){
        console.log(rows);
        //select로 다시 요청하게 만들기!
        res.redirect('/select')
    })
})

// 회원 수정
router.post('/update', (req,res) => {
    let {id,pw,nick} = req.body;
    let sql = 'update member set pw=?, nick=? where id=?'

    conn.query(sql, [pw, nick, id], function(err, rows, fields){
        console.log(rows)
        res.redirect('/select')

    })

})

// 회원 삭제
router.get('/delete/:id', (req,res) =>{
    let {id} = req.params;
    let sql = 'DELETE FROM member where id =?'
    conn.query(sql, [id], function(err, rows, fields){
        console.log(rows)
        res.redirect('/select')
    })

})

// 경로에 포함된 데이터 가져오기
// 해당 아이디
router.get('/delete')
module.exports = router