const Sequelize = require('sequelize');


module.exports = class Room extends Sequelize.Model{
    // init : 테이블 정의 (컬럼, 자료형..., 테이블 자체 설정)
    // associate : 테이블 관계
    static init(sequelize){ // sequelize -> models/init.js 에서 생성한 Sequelize 객체
       super.init({
       roomid : {
            type : Sequelize.STRING(50), // 자료형 타입, 크기
            primaryKey : true,
            allowNull : false,
            unique : true
        },
        title :{
            type : Sequelize.STRING(50),
            allowNull : false
        },
        owner : {
            type : Sequelize.STRING(50),
            allowNull : false
        }        
       },{
        sequelize,
        timestamps : false,
        modelName : 'Room',
        tableName : 'room',
        charset : 'utf8',
        collate : 'utf8_general_ci'
       })
    }
    
    static associate(db){ // 테이블 관계 설정
        
    }
}