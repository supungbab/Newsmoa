<template>
  <div class="wrap--main">
      <section class="main news-detail">
        <div class="news-detail__header">
          <div>언론사 이름</div>
          <h1 class="news_detail__title">뉴스 제목입니다.</h1>

          <ul class="news-detail__info">
            <li>12시간 전</li>
            <li>댓글 2</li>
            <li>좋아요 4</li>
          </ul>

          <p class="news-detail__contents">
            <img
              src="https://source.unsplash.com/random"
              alt=""
              class="news-detail__contents__img"
            />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            recusandae voluptates voluptate itaque minus magnam autem repellat,
            quo totam suscipit dolorem. Ullam nihil id soluta enim laboriosam,
            dolor perferendis neque!
          </p>
        </div>
      </section>
      <aside class="aside">
         <section>
          <h1 class="title">관련 뉴스</h1>
          <ul class=""></ul>
        </section>

        <section class="wrap--comment">
          <h1 class="title">
            댓글
            <span class="">2</span>
          </h1>
          <Comment/>
          <Comment/>

          <form action="" class="comment__form">
            <input type="text" name="" id="" class="input" />
            <button type="submit" class="btn__sm--primary">입력</button>
          </form>
        </section>
     </aside>
  </div>
</template>

<script>
import Comment from '@/components/Comment'


export default {
  name: 'NewsDetail',
  components: {
    Comment
  }
}
</script>

<style scoped>
.news-detail__info {
  list-style: none;
  display: flex;
  margin: 5px 0 30px;
}

.news-detail__info li {
  padding-right: 10px;
}

.news-detail__contents__img {
  display: block;
  width: 60%;
  margin: 15px auto;
}

.comment__form {
  display: flex;
  margin: 10px 0;
}
</style>
