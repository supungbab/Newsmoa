<template>
    <div :class="`${items.type}`">
        <p class="user">{{items.user}}</p>
        <div class="msg">
            {{items.msg}}
        </div>
    </div>
</template>

<script>
    export default {
        name:'debate-msg',
        props:{
            items: { type: Object }
        }
    }
</script>