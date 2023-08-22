const Sequelize = require('sequelize');


module.exports = class Chat extends Sequelize.Model{
    // init : 테이블 정의 (컬럼, 자료형..., 테이블 자체 설정)
    // associate : 테이블 관계
    static init(sequelize){ // sequelize -> models/init.js 에서 생성한 Sequelize 객체
       super.init({
       chatid : {
            type : Sequelize.INTEGER, // 자료형 타입, 크기
            primaryKey : true,
            allowNull : false,
            unique : true,
            autoIncrement : true
        },
        roomid :{
            type : Sequelize.STRING(50),
            allowNull : false
        },
        chat : {
            type: Sequelize.STRING(1000),
            allowNull : false
        },
        chatdt : {
            type : Sequelize.DATE,
            allowNull : false,
            defaultValue : Sequelize.NOW
        }      
       },{
        sequelize,
        timestamps : false,
        modelName : 'Chat',
        tableName : 'chat',
        charset : 'utf8',
        collate : 'utf8_general_ci'
       })
    }
    
    static associate(db){ // 테이블 관계 설정
        db.Chat.belongsTo(db.Member, {foreignKey:'userid', targetKey:'id'})

    }
}