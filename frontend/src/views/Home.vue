<template>
  <div class="wrap--main">
    <section class="main wrap--news">
      <h1 class="blind">종합 뉴스</h1>
      <News v-for="(item, i) in newsData" v-bind:items="newsData[i]" v-bind:key="i" />
    </section>
    <aside class="aside">
      <section>
        <h1>오늘의 인기 뉴스</h1>
        <ol class="trending">
          <li><NewsTrending/></li>
          <li><NewsTrending/></li>
          <li><NewsTrending/></li>
          <li><NewsTrending/></li>
          <li><NewsTrending/></li>
        </ol>
      </section>

      <!--
      <section>
        <h1 class="title">추천 뉴스</h1> 
        <ol class="">
          <li><NewsCompact/></li>
          <li><NewsCompact/></li>
        </ol>
      </section>
      -->

    </aside>
  </div>
</template>

<script>
// @ is an alias to /src
import News from '@/components/News';
import NewsTrending from '@/components/NewsTrending';
//import NewsCompact from '@/components/NewsCompact';
import * as BoardsApi from '@/api/BoardsApi';

export default {
  name: 'Home',
  components: {
    News,
    NewsTrending,
    //NewsCompact
  },
  data(){
    return{
      newsData:[]
    }
  },
  created(){
    this.getBoards()
  },
  props:{
    category:{
      type: String,
      default : ''
    }
  },
  methods : {
    getBoards(){
      //console.log(localStorage.getItem('category'));
      let C=localStorage.getItem('category')
      BoardsApi.getBoards(C).then(res=>{
          //console.log(res.data.boards);
          this.newsData = res.data.boards;
          //console.log(this.newsData)
      }).catch(err=>{
          console.log(err);
      });
    }
  },
  watch:{
    category:function(){
      localStorage.setItem('category',this.category)
      this.getBoards()
    }
  }
}
</script>
