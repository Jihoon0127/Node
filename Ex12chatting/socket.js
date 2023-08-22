const socketIO = require('socket.io')

                // express server
module.exports = (server,app) =>{
    // socketIO 객체
    const io = socketIO(server, {path : '/socket.io'})

    app.set('io',io)

    // 라우팅 (-> 네임스페이스)
    // 채팅 -> /chat
    // 실시간 알림 -> /alarm
    
    const chat = io.of('/chat') // 채팅 관련 처리 네임스페이스

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스 접속 성공');

        // room설정 -> 방이름(roomid) -> 클라이언트 요청경로 (request)
        const ref = socket.request.headers.referer
        const roomid = ref.split('/')[ref.split('/').length-1]
        console.log(roomid);

        socket.join(roomid)

        socket.on('discoonect', () =>{
            console.log('chat 네임스페이스에서 접속해제');
        })

        socket.on('chat', (data) => { // data : 채팅 관련 데이터
            console.log('socket.js : ', data);

            socket.to(roomid).emit(data)
        })
    })
}