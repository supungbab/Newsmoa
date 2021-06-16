<template>
    <div class="content">
        <div class="contact-profile">
			<!--<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="">-->
            <i class="material-icons main">account_circle</i>
			<p>{{this.$cookies.get("room")}} 채팅방</p>
            <!--
			<div class="social-media">
				<i class="fa fa-facebook" aria-hidden="true"></i>
				<i class="fa fa-twitter" aria-hidden="true"></i>
				<i class="fa fa-instagram" aria-hidden="true"></i>
			</div>
            -->
		</div>
        <div class="messages">
			<ul>
                <chat-msg v-for="(item, i) in ChatData" v-bind:items="ChatData[i]" v-bind:key="i" />
			</ul>
		</div>
        <div class="message-input">
			<div class="wrap">
			<input type="text" placeholder="메세지를 입력하세요." @keyup.enter="send" v-model="msg" >
			<button class="button" @click="send"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
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
// https://kyounghwan01.github.io/blog/Vue/vue/vue-cookies/ 쿠키 얻어오기.

import $ from 'jquery';
import ChatMsg from '../ChatMsg'

    export default {
        name: 'content-chat',
        components: {
            ChatMsg
        },
        data(){
            return{
                ChatData:[],
                index: 0,
                msg:''
            }
        },

        created(){
            let vm=this; // this 를 미리 저장하는 이유는 소켓.on 으로 들어갈 때 this는 다른 영역이므로 ChatData 를 찾지 못함. 즉 window 상태의 this를 저장해야함
            //받기.
            vm.$socket.on('system', function(data) {
                //console.log(data,"시스템 소켓")
                vm.ChatData=data.chatlog;
                $(".messages").stop().animate({ scrollTop: 10000}, 1000);
                //$(".messages").stop().animate({ scrollTop: $(".messages ul")[0].scrollHeight}, 1000);
            });

            vm.$socket.on('message', function(data) {
                //console.log(data,"메세지 소켓")
                if(data.room==vm.$cookies.get("room")){
                    vm.ChatData=data.chatlog;
                    $(".messages").stop().animate({ scrollTop: $(".messages ul")[0].scrollHeight}, 1000);
                }
            });
        },
        methods : {
            send(){
                if(this.msg.trim() != ''){
                    
                    this.index++;
                    this.ChatData.push({"index":this.index,"msg":this.msg,"type":'server'})
                    let vm=this;
                    this.$socket.emit('user', {
                        name : '관리자',
                        message : vm.msg,
                        room : vm.$cookies.get("room"),
                        type:'server'
                    });
                    this.msg='';
                    $("#chat-input").focus()
                    $(".messages").stop().animate({ scrollTop: $(".messages ul")[0].scrollHeight}, 1000);
                    //console.log('새로고침')
                    vm.$socket.emit('rooms', {
                        type : 'room'
                    });
                    //console.log($(".messages ul")[0].scrollHeight);
                }
            }
        }
    }
</script>

<style>
    @import url(https://fonts.googleapis.com/icon?family=Material+Icons);
</style>