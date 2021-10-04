<template>
    <div id="chatbox-main2"> 
        <div class="chat-box2">
            <div class="chat-box-header2">
                토론방
            </div>
            <div class="chat-box-body2">
                <div class="chat-box-overlay2">
                </div>
                <!--chat-log -->
                <div class="chat-logs2">
                    <debate-msg v-for="(item, i) in DebateData" v-bind:items="DebateData[i]" v-bind:key="i" />
                    <!--<chat-msg :index="index" :msg="msg" :type="type"/>-->
                </div>
            </div>
            <div class="chat-input2">      
                <form autocomplete="off" onsubmit="return false">
                    <input type="text" id="chat-input2" placeholder="메세지 입력" @keyup.enter="send" v-model="msg" />
                    <button type="button" class="chat-submit2" id="chat-submit2" @click="send"><i class="material-icons">send</i></button>
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
import DebateMsg from './DebateMsg'
export default {
    name: 'debate',
    components: {
        DebateMsg
    },
    data(){
        return{
            DebateData:[],
            index: 0,
            msg:'',
            sw:0,
            debateRoom:0
        }
    },
    created(){
        this.DebateData = [
                    {
                        "msg": "토론 채팅에 연결되었습니다.",
                        "type": "server"
                    },
                    {
                        "msg": "할로 친구들",
                        "type": "user"
                    },
                    {
                        "index": 1,
                        "msg": "하이하이",
                        "type": "user"
                    },
                    {
                        "index": 2,
                        "msg": "토론을 시작해보자",
                        "type": "server"
                    },
                    {
                        "index": 3,
                        "msg": "그래그래",
                        "type": "user"
                    },
                ]
    },
    methods : {
        
    }
}
</script>

<style>
    @import '../assets/css/debate.css';
    @import url(https://fonts.googleapis.com/icon?family=Material+Icons);
</style>