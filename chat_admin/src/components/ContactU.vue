<template>
    <li :class="`contact ${items.length}`" @click="join">
        <div class="wrap">
            <span class="contact-status online"></span>
            <!--<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />-->
            <i class="material-icons">account_circle</i>
            <div class="meta">
                <p class="name">{{items.room}} 채팅방</p>
                <p class="preview">{{items.chatlog[items.chatlog.length-1].msg}}</p>
            </div>
        </div>
    </li>
</template>

<script>
import $ from 'jquery';
//https://blog-han.tistory.com/31 부모 호출!
export default {
    name:'contact-u',
    props:{
        items:{type:Object}
    },
    methods : {
        join(){
            //선택
            let vm=this
            let sBtn = $(".contact");
            sBtn.removeClass("active");  
            $("."+vm.items.length).addClass("active");
            vm.$socket.emit('connection', {
                type : 'join',
                name : '관리자',
                room : vm.items.room
            });
            vm.$cookies.set("room", vm.items.room);
        }
    }
}
</script>

<style>

</style>