<template>
    <li :class="`chat-msg ${items.type}`">
		<i class="material-icons">account_circle</i>
		<p>{{items.msg}}</p>
	</li>
</template>

<script>
    export default {
        name:'chat-msg',
        props:{
            items: { type: Object }
        }
    }
</script>