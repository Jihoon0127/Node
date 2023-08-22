// ---------- sql과 연동하기!! -----------
// mysql2 : promises 사용이 가능한 형태
const mysql = require('mysql2')

const db_info = {
    host : 'localhost',
    port : '3306',
    user : 'fullstack', // 계정
    password : '12345',
    database : 'boot'   // 스키마 이름
}

// db 연결 -> 함수로 내보내기 
// 함수 {초기화하는 함수, 연결해주는 함수}
module.exports = {
    init : function(){ // 작성한 db 연결정보로 연결 객체 생성&반환
        return mysql.createConnection(db_info) // 1. connection(연결) 객체 생성
        // 생성할 때는 실제 데이터 연결정보를 넣어줘야 함. 따라서 위에 만들어준 애랑 연결하기
        // 2. return : 생성한 연결객체를 반환하기
    },
    connect : function(conn){ // mysql 서버 연결 함수 , conn => 연결객체
        // connect 호출할 때는 연결객체를 넘겨줄 것이고, 이 연결객체를 통해 실제로 연결함
        // conn : mysql의 createConnection으로 만들어준 애
        
        conn.connect(function(err){
            if(err) console.log('연결 실패!' + err);
            else console.log('연결 성공!');
        })

    }
}
