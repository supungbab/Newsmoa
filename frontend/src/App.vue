<template>
  <div id="app">
    <div class="wrap">
      <Header/>
      <Nav/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Nav from '@/components/layout/Nav.vue'

export default {
  components: {
    Header,
    Nav
  }
}
</script>


<style>
  @import './assets/css/common.css';
  @import './assets/css/mobile.css';
</style>
