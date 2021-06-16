<template>
    <div id="chatbox-main"> 
        <div id="chat-circle" class="btn btn-raised" @click="togle">
            <div id="chat-overlay"></div>
            <i class="material-icons">question_answer</i>
        </div>
        <div class="chat-box">
            <div class="chat-box-header">
                관리자 문의
                <span class="chat-box-toggle" @click="togle"><i class="material-icons">close</i></span>
            </div>
            <div class="chat-box-body">
                <div class="chat-box-overlay">
                </div>
                <!--chat-log -->
                <div class="chat-logs">
                    <chat-msg v-for="(item, i) in ChatData" v-bind:items="ChatData[i]" v-bind:key="i" />
                    <!--<chat-msg :index="index" :msg="msg" :type="type"/>-->
                </div>
            </div>
            <div class="chat-input">      
                <form autocomplete="off" onsubmit="return false">
                    <input type="text" id="chat-input" placeholder="메세지 입력" @keyup.enter="send" v-model="msg" />
                    <button type="button" class="chat-submit" id="chat-submit" @click="send"><i class="material-icons">send</i></button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// https://okky.kr/article/459448 채팅데모
// https://blog.naver.com/gumgim95/221729036672 엔터키로 채팅전송
// https://im-designloper.tistory.com/41 jquery 사용법
// https://nesoy.github.io/articles/2017-04/Socket.io 소켓 설명
// https://stackoverflow.com/questions/47549891/vue-js-cannot-read-property-push-of-undefined/47551570 소켓 오류 해결
import $ from 'jquery';
import ChatMsg from './ChatMsg'

export default {
    name: 'chat-box',
    components: {
        ChatMsg
    },
    data(){
        return{
            ChatData:[],
            index: 0,
            msg:'',
            room:0,
            sw:0
        }
    },
    created(){
        let vm=this; // this 를 미리 저장하는 이유는 소켓.on 으로 들어갈 때 this는 다른 영역이므로 ChatData 를 찾지 못함. 즉 window 상태의 this를 저장해야함
        vm.$socket.on('connection', (data)=> {
            console.log('connect');
            if(data.type === 'connected') {
                if(localStorage.getItem('room')==null)
                    localStorage.setItem('room', (Math.random() * 100)+1);
                vm.room = localStorage.getItem('room');
                //console.log('여기서 계속 반복');
            }
        })
        vm.$socket.on('system', function(data) {
            console.log(data,"시스템 소켓")
            vm.ChatData=data.chatlog;
            $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
            //generate_message(data.message, 'user');
        });

        vm.$socket.on('message', function(data) {
            console.log(data,"메세지 소켓")
            vm.ChatData=data.chatlog;
            $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
            //generate_message(data.message, 'user'); 
        });
    },
    methods : {
        togle(){
            let vm=this
            if(this.sw==0){
                vm.$socket.emit('connection', {
                    type : 'join',
                    name : '익명',
                    room : vm.room
                });
                this.sw=1;
            }
            $("#chat-circle").toggle('scale');
            $(".chat-box").toggle('scale');
        },
        send(){
            if(this.msg.trim() != ''){
                this.index++;
                this.ChatData.push({"index":this.index,"msg":this.msg,"type":'user'})
                let vm=this;
                this.$socket.emit('user', {
                    name : '익명',
                    message : vm.msg,
                    room : vm.room,
                    type : 'user'
                });
                this.msg='';
                $("#chat-input").focus()
                $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
                //console.log($(".chat-logs")[0]);
            }
        }
    }
}
</script>

<style>
    @import '../assets/css/chat.css';
    @import url(https://fonts.googleapis.com/icon?family=Material+Icons);
</style>