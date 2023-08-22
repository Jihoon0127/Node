const socketIO = require('socket.io')


// socket.io의 경우 어디 서버와 연결할 것인지 알려줘야 사용가능함
module.exports = (server) => { // 서버에 대한 내용 보내주기. == express server
    // { express server 연결, 클라이언트가 접속할 경로 }
    const io = socketIO(server, {path : '/socket.io'}) 
    // => socket.io 객체 하나 생성!

    // 클라이언트가 접속(connection)했을 때 : 이벤트 처리 하기 ==> on!
    io.on('connection', (socket)=>{ 

        // 1. 접속
        // 클라이언트가 접속하면 해당 클라이언트와 통신할 수 있는 소켓 객체 하나 생성
        console.log('새로운 클라이언트 접속!', socket.id)

        // 2. 접속 해제 : disconnect
        socket.on('disconnect', ()=>{
            console.log('클라이언트 접속 해제!', socket.id)
        })

        // 3. 오류 발생 처리
        socket.on('error', (error)=>{
            console.log(error);
        })

        // 4. 클라이언트의 메시지 받는 이벤트
        socket.on('reply', (data)=>{// 클라이언트가 보낸 메시지는 data라는 공간을 통해 받을 수 있음
            console.log(data) // data : 클라이언트가 보낸 메시지 자체 
        }) 

        // 5. 서버쪽에서 먼저 이벤트 발생 (3초마다 메시지 보내기)
        socket.interval = setInterval(()=>{
            socket.emit('news', 'Hello Socket.io') // emit: 이벤트{key, value} 발생시키기
            // news라는 이벤트는 'Hello~'의 문자열을 보내는 함수이다!
        }, 3000) // -> 3초마다
    })
} 