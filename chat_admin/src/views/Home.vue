<template>
    <div id="frame">
        <side-panel />
        <content-chat />
    </div>
</template>

<script>
import SidePanel from '@/components/layout/SidePanel'
import ContentChat from '@/components/layout/ContentChat'

export default {
    name:'Home',
    components:{
        SidePanel,
        ContentChat
    },
    created(){
        let vm=this; // this 를 미리 저장하는 이유는 소켓.on 으로 들어갈 때 this는 다른 영역이므로 ChatData 를 찾지 못함. 즉 window 상태의 this를 저장해야함
        
        vm.$socket.on('connection', (data)=> {
            console.log('connect');
            if(data.type === 'connected') {
                //
            }
        });
    }
}
</script>

<style>
@import url(https://fonts.googleapis.com/icon?family=Material+Icons);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.2/css/font-awesome.min.css);
@import url('../assets/css/reset.min.css');
@import url('../assets/css/style.css');
</style>