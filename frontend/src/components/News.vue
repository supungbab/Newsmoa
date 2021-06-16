<template>
  <article>
    <router-link :to="{path:`detail/${items.index}`}" class="news">
      <img
        :src="items.topimg"
        alt=""
        class="news__img"
      />
      <div class="news__text-wrap">
        <h1 class="news__title">
          {{items.title}}
        </h1>
        <p class="news__contents">
          {{items.content}}
        </p>

        <div class="news__info">
          <div>
            <span class="news__press">{{items.media}}</span>
            <span class="news__time">
              <span class="icon__time blind"></span>{{items.date}}
            </span>
          </div>
          <div>
            <span class="icon__comment">
              <span class="blind">댓글</span>
              <span class="cnt">{{commentCnt}}</span>
            </span>
            <span class="icon__like">
              <span class="blind">좋아요</span>
              <span class="cnt">{{likeCnt}}</span>
            </span>
          </div>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
import * as BoardsApi from '@/api/BoardsApi';
export default {
  
  name: 'News',
  props: {
    items: { type: Object }
  },
  data(){
    return{
      commentCnt:0,
      likeCnt:0
    }
  },
  created(){
    BoardsApi.getComment(this.items.index).then(res=>{
      this.commentCnt=res.data.commentCount
    }).catch(err=>{
      console.log(err)
    })
    BoardsApi.getLike(this.items.index).then(res=>{
      this.likeCnt=res.data.likeCount
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.news {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 130px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}

.news__img {
  width: 200px;
  background-position: center;
  object-fit: cover;
}

.news__text-wrap {
  width: 100%;
  position: relative;
  margin: 0 10px;
}

.news__info {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.news__press {
  margin-right: 3px;
}

.news__title {
  margin-bottom: 10px;
}

.news__title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 50px;
  line-height: 25px;
  font-size: 20px;
  overflow: hidden;
}

.news__contents {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 40px;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
}

@media (max-width: 700px) {
  .news {
    height: 80px;
  }

  .news__img {
    width: 120px;
  }

  .news__contents,
  .news__like,
  .news__comment {
    display: none;
  }
}
</style>