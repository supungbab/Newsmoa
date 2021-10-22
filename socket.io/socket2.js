'use strict';
var io = require('socket.io').listen(8083);

io.sockets.on('connection', socket => {
    //소켓 접속 connected 전송
    socket.emit('connection', {
        type : 'connected'
    });
    socket.on('connection', data => {
        //커넥션 라인에서 join 이라는 데이터를 emit 해서 받으면 실행
        if(data.type === 'join') {
            console.log("토론 조인 연결!")
            let sw=0;
            //emit에서 받은 룸 을 join 한다.
            //console.log(data)
            socket.join(data.room);
            /*
            socket.broadcast.to(data.room).emit('system', {
                message : `${data.name} is connected`
            });
            */
        }
    });
    //사용자가 메세지를 입력 후 전송할때 필요한 소켓
    socket.on('chat', data => {
        //console.log(data)
        //메세지 정보를 해당 룸에 소켓에만 전송한다.
        socket.broadcast.to(data.room).emit('message',{
            ...data
        });
    });
});