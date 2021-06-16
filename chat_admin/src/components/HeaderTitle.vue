<template>
    <div id="profile">
        <div class="wrap">
            <img id="profile-img" :src="pImg" class="online" alt="">
            <p>문의 채팅</p>
            <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
            <div id="status-options">
                <ul>
                    <li id="status-online" class="active"><span class="status-circle"></span> <p>Online</p></li>
                    <li id="status-away"><span class="status-circle"></span> <p>Away</p></li>
                    <li id="status-busy"><span class="status-circle"></span> <p>Busy</p></li>
                    <li id="status-offline"><span class="status-circle"></span> <p>Offline</p></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'header-title',
    data(){
        return{
            pImg : require("../assets/image/icon.png")
        }
    }
}
</script>

<style>

</style>

