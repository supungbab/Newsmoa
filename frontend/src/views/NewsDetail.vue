<template>
  <div class="wrap--main">
      <section class="main news-detail">
        <div class="news-detail__header">
          <div>언론사 이름</div>
          <h1 class="news_detail__title">뉴스 제목입니다.</h1>

          <ul class="news-detail__info">
            <li><span class="icon__time blind"></span>12시간 전</li>
            <li><span class="icon__comment blind"></span> 댓글 2</li>
            <li><span class="icon__like blind"></span> 좋아요 4</li>
          </ul>
        </div>

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

        <section class="wrap--comment">
          <h1 class="title">
            댓글
            <span class="">2</span>
          </h1>

          <div class="comment_list">
            <p v-if="!isCommentNull" class="comment_list__empty">댓글이 없습니다</p>
            <ol v-if="isCommentNull">
              <li><Comment/></li>
              <li><Comment/></li>
            </ol>

            <form action="" class="comment__form">
              <textarea class="textarea"></textarea>
              <button type="submit" class="btn__sm--primary">입력</button>
            </form>
          </div>
        </section>
      </section>

      <aside class="aside">
         <section>
          <h1 class="title">관련 뉴스</h1>
          <ol class="">
            <li><NewsCompact/></li>
            <li><NewsCompact/></li>
          </ol>
        </section>
     </aside>
  </div>
</template>

<script>
import Comment from '@/components/Comment';
import NewsCompact from '@/components/NewsCompact';

export default {
  name: 'NewsDetail',
  components: {
    Comment,
    NewsCompact
  },
  data() {
    return {
      commentCnt: 0
    }
  },
  computed: {
    isCommentNull() {
      return (this.commentCnt === 0) ? true : false;
    }
  }
}
</script>

<style scoped>
.comment_list {
  padding: 0 15px;
}

.comment_list__empty {
  text-align: center;
  padding: 50px 0;
}

.news-detail__info {
  list-style: none;
  display: flex;
  margin: 5px 0 30px;
  font-size: 15px;
}

.news-detail__info li {
  padding-right: 10px;
}

.news-detail__info li span {
  padding:0 10px;
}

.news-detail__contents {
  margin-bottom: 80px;
}

.news-detail__contents__img {
  display: block;
  width: 60%;
  margin: 15px auto;
}

.comment__form {
  display: flex;
  margin: 25px 0;
}

.comment__form .btn__sm--primary {
  height: initial;
  border-radius: 0 3px 3px 0;
}

.textarea {
  border-radius: 3px 0 0 3px;
}
</style>
