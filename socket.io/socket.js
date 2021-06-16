'use strict';
var io = require('socket.io').listen(8082);
let room = [];
let check=0;
io.sockets.on('connection', socket => {
    //console.log("누가 들어오김함")
    socket.emit('connection', {
        type : 'connected'
    });
    socket.on('connection', data => {

        if(data.type === 'join') {
            console.log("조인 연결!")
            let sw=0;
            socket.join(data.room);
            for(let i=0;i<room.length;i++){
                if(room[i].room==data.room)
                    sw=1;
            }
            if(sw==0){
                room.push({"room":data.room,"length":room.length,"chatlog":[{"msg":"서버와 연결되었습니다.","type":'server'}]});
                console.log("룸생성라인",room)
            }
            // depracated
            // socket.set('room', data.room);
            socket.room = data.room;
            
            for(let i=0;i<room.length;i++){
                if(room[i].room==data.room){
                    check=i;
                    break;
                }
            }
            socket.emit('system', {
                chatlog : room[check].chatlog
            });
            console.log("커넥라인.",data.room,room[check].chatlog);
            /*
            socket.broadcast.to(data.room).emit('system', {
                message : `${data.name} is connected`
            });
            */
            socket.broadcast.emit('rooms',{
                rooms:room
            })
        }
    });
    socket.emit('rooms', {
        rooms : room
    });
    socket.on('rooms', data => {
        if(data.type === 'room') {
            socket.emit('rooms', {
                rooms : room
            });
        }
    });
    socket.on('user', data => {

        // depracated
        // socket.get('room', (error, room) => {
        // });
        console.log("유저라인 풜문")
        socket.room = data.room;
        for(let i=0;i<room.length;i++){
            if(room[i].room==data.room){
                check=i;
                break;
            }
        }
        console.log("유저라인 풜문 끝")
        room[check].chatlog.push({"msg":data.message,"type":data.type})
        console.log("유저라인.",room[check].chatlog);

        //나 제외 모든 룸에게 전달
        socket.broadcast.emit('rooms',{
            rooms:room
        })
        socket.broadcast.to(data.room).emit('message',{
            chatlog : room[check].chatlog,
            room : data.room
        });
    });
    

});