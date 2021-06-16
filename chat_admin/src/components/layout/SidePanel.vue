<template>
    <div id="sidepanel">
        <header-title />
        <contacts />
        <div id="bottom-bar">
            <button id="addcontact" @click="Refresh"><i class="fa fa-refresh fa-fw" aria-hidden="true"></i> <span>새로고침</span></button>
            <button id="settings"><i class="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
        </div>
    </div>
</template>

<script>
import Contacts from '../Contacts'
import HeaderTitle from '../HeaderTitle'

export default {
    name:'side-panel',
    components:{
        Contacts,
        HeaderTitle
    },
    data(){
        return{
            UserData:[]
        }
    },
    methods:{
        Refresh(){
            let vm = this
            //console.log('새로고침')
            vm.$socket.emit('rooms', {
                type : 'room'
            });
        }
    }
}

</script>

<style>

</style>