<template>
  <div class="wrap--main">
      <section class="main wrap--news">
        <h1 class="blind">추천 뉴스</h1>
        <News/>
        <News/>
        <News/>
        <News/>
      </section>
      <aside class="aside">
         <TrendingList/>
     </aside>
  </div>
</template>

<script>
// @ is an alias to /src
import News from '@/components/News'
import TrendingList from '@/components/TrendingList'

export default {
  name: 'Home',
  components: {
    News,
    TrendingList
  }
}
</script>
