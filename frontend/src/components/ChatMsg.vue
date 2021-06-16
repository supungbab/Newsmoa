<template>
    <div :class="`chat-msg ${items.type}`">
        <span class="msg-avatar">
            <i class="material-icons">account_circle</i>
        </span>
        <div class="cm-msg-text">
            {{items.msg}}
        </div>
    </div>
</template>

<script>
    export default {
        name:'chat-msg',
        props:{
            items: { type: Object }
        }
    }
</script>