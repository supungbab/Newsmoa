<template>
  <div id="app">
    <div class="wrap">
      <Header/>
      <Nav/>
      <chat-box />
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Nav from '@/components/layout/Nav.vue'
import ChatBox from '@/components/ChatBox'

export default {
  components: {
    Header,
    Nav,
    ChatBox
  }
}
</script>


<style>
  @import './assets/css/common.css';
  @import './assets/css/mobile.css';
</style>
