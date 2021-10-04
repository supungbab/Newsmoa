<template>
    <div :class="`chat-msg2 ${items.type}`">
        <span class="msg-avatar2">
            <i class="material-icons">account_circle</i>
        </span>
        <div class="cm-msg-text2">
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