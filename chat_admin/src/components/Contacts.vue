<template>
    <div id="contacts">
        <ul>
            <contact-u v-for="(item, i) in UserData" v-bind:items="UserData[i]" v-bind:key="i" />
        </ul>
    </div>
</template>

<script>
import ContactU from './ContactU'

export default {
    name:'contacts',
    components:{
        ContactU
    },
    data(){
        return {
            UserData:[]
        }
    },
    created(){
        let vm=this;
        vm.$socket.on('rooms', function(data) {
            
            vm.UserData=data.rooms
            //console.log("여기야",vm.UserData);
        });
    },
    methods : {
    }
}
</script>


<style>

</style>