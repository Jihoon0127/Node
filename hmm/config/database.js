const mysql = require('mysql2')

const db_info = {
    host : 'localhost',
    port : '3306',
    user : 'fullstack', 
    password : '12345',
    database : 'boot'   
}

module.exports = {
    init : function(){ 
        return mysql.createConnection(db_info) 
        
    },
    connect : function(conn){ 
        
        
        conn.connect(function(err){
            if(err) console.log( err);
            else console.log('연결 성공!');
        })

    }
}