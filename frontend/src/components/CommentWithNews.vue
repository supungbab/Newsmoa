<template>
  <li>
    <div class="cmt-w-news">
      <a :href="`detail/`+items.index" class="cmt-w-news__header">
        <img
          :src="items.topimg"
          alt=""
          class="cmt-w-news__img"
        />
        <div>
          <h1 class="cmt-w-news__title">{{items.title}}</h1>
          <span class="comment__time">{{items.createAt}}</span>
        </div>
      </a>
      <div>
        <p class="comment__contents">
          댓글 : {{items.comment}}
          <!--<button class="comment__contents-btn" type="button">
            더보기
          </button>-->
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
    name: 'CommentWithNews',
    props : {
      items : {}
    }
}
</script>

<style scoped>
li {
  list-style: none;
  margin-bottom: 7px;
}

.cmt-w-news {
  margin-bottom: 10px;
  border: 1px solid var(--line-color-light);
  padding: 12px;
  padding-bottom: 30px;
}

.cmt-w-news__header {
  display: flex;
  margin-bottom: 10px;
}

.cmt-w-news__img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.cmt-w-news__title {
  display: block;
	white-space: no-wrap;
	overflow: hidden;
	text-overflow: ellipsis;
  font-size: 16px;
  align-self: center;
}

.comment__time {
  font-size: 12px;
}

.comment__contents {
  position: relative;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-height: 60px;
  line-height: 20px;
  overflow: hidden;
}

.comment__contents-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border: 0;
}
</style>