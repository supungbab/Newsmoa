<template>
  <div class="wrap--main">
      <section class="main wrap--news">
        <h1 class="blind">추천 뉴스</h1>
        <News/>
        <News/>
        <News/>
        <News/>
      </section>
      <Aside/>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from '@/components/layout/Aside.vue'
import News from '@/components/News'

export default {
  name: 'Home',
  components: {
    Aside,
    News
  }
}
</script>
