<template>
    <div class="debate">
        <div class="chatHead" @click="connect">토론방 연결하기 클릭!</div>
        <div class="chatBody">
            <div class="chatLog">
                <debate-msg v-for="(item, i) in DebateData" v-bind:items="DebateData[i]" v-bind:key="i" />
            </div>
        </div>
        <div class="chatInput">      
            <form autocomplete="off" onsubmit="return false">
                <input type="text" id="chatInput" placeholder="메세지 입력" @keyup.enter="send" v-model="msg" />
                <button type="button" class="chatSubmit" id="chatSubmit" @click="send"><i class="material-icons">send</i></button>
            </form>
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
import * as usersApi from '@/api/UsersApi';

export default {
    name: 'debate',
    components: {
        DebateMsg
    },
    props:{
        room:{type:String}
    },
    data(){
        return{
            DebateData:[],
            index: 0,
            msg:'',
            debateRoom:this.room,
            sw:0
        }
    },
    created(){
        let vm=this; // this 를 미리 저장하는 이유는 소켓.on 으로 들어갈 때 this는 다른 영역이므로 ChatData 를 찾지 못함. 즉 window 상태의 this를 저장해야함
        //화면이 로드될 때 방이 생성됩니다. 방은 랜덤 숫자값으로 생성됩니다.
        vm.$socket2.on('connection', (data)=> {
            console.log('connect 토론창');
            if(data.type === 'connected') {
                vm.debateRoom = this.room;
                //console.log(vm.debateRoom);
            }
        });
        
        vm.$socket2.on('message', function(data) {
            console.log(data,"메세지 소켓")
            //vm.DebateData.push(data);
            //console.log(data);
        });
    },
    methods : {
        send(){
            usersApi.auth(this.$cookies.get("userToken")).then(res =>{
                if(this.msg.trim() != ''){
                    this.index++;
                    this.DebateData.push({"user":res.data.me.id,"msg":this.msg,"type":'me'})
                    let vm=this;
                    this.$socket2.emit('chat', {
                        "user" : res.data.me.id,
                        "msg" : vm.msg,
                        "room" : vm.debateRoom,
                        "type" : 'another'
                    });
                    this.msg='';
                    //이거 매우 중요!!!
                    //DebateData 데이터 변경 후 리렌더링 후에 적용되는 이 함수를 쓰면 적용된 후 document로 바로 갈 수 있다.
                    this.$nextTick(function() {
                        let chatBody = document.querySelector(".chatBody");
                        let chatLog = document.querySelector(".chatLog");
                        chatBody.scrollTop = (chatLog.scrollHeight)
                        //console.log(chatBody.scrollTop,chatLog.scrollHeight);
                    })
                }
            }).catch(err=>{
                console.log(err)
                alert('로그인 후 사용해주세요.')
            })
        },
        connect(){
            let vm=this
            //메세지 토글을 선택 시 커넥션 소켓이 실행되어 처리됩니다.
            if(this.sw==0){
                vm.$socket2.emit('connection', {
                    type : 'join',
                    room : vm.debateRoom
                });
                vm.DebateData.push({
                        "msg": "토론 채팅에 연결되었습니다.",
                        "user":`${vm.debateRoom}번 토론방`,
                        "type": "another"
                })
                this.sw=1;
            }
        }
    }
}
</script>

<style>
    @import '../assets/css/debate.css';
    @import url(https://fonts.googleapis.com/icon?family=Material+Icons);
</style>