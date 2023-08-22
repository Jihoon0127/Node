'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('room', [{
        roomid: 'room1',
       title: '풀스택 채팅방',
       owner : 'member1'
      },{
        roomid: 'room2',
       title: '풀스택 채팅방',
       owner : 'member1'
      },{
        roomid: 'room3',
       title: '풀스택 채팅방',
       owner : 'member1'
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('room', null, {});
     
  }
};
