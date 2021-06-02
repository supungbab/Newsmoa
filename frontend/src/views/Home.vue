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
      <section>
        <h1>급상승 뉴스</h1>
        <ol class="trending">
          <li><NewsTrending/></li>
          <li><NewsTrending/></li>
          <li><NewsTrending/></li>
          <li><NewsTrending/></li>
          <li><NewsTrending/></li>
        </ol>
        <TrendingList/>
      </section>
      
      <section>
        <!-- 로그인 시 최근 본 뉴스, 아닐 경우 최신 뉴스? 추천 뉴스? 같은걸로 보여주기 -->
        <h1 class="title">추천 뉴스</h1> 
        <ol class="">
          <li><NewsCompact/></li>
          <li><NewsCompact/></li>
        </ol>
      </section>
    </aside>
  </div>
</template>

<script>
// @ is an alias to /src
import News from '@/components/News';
import NewsTrending from '@/components/NewsTrending';
import NewsCompact from '@/components/NewsCompact';

export default {
  name: 'Home',
  components: {
    News,
    NewsTrending,
    NewsCompact
  }
}
</script>
