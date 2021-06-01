<template>
  <div class="comment">
    <a href="">
      <img
        src="@/assets/image/default/user.png"
        alt=""
        class="comment__user-img"
      />
    </a>
    <div>
      <div class="comment__header">
        <a href="">
          <h1 class="comment__user-name">닉네임</h1>
        </a>
        <span class="comment__time">1시간 전</span>
      </div>
      <p class="comment__contents">
        댓글 내용입니다. Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Pariatur consequatur accusantium nesciunt
        similique nihil animi odio? Nam tempore in mollitia provident,
        architecto, rem facilis dignissimos quisquam a id molestiae
        cumque!

        <button class="comment__contents-btn" type="button">
          더보기
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Comment'
}
</script>

<style scoped>
.comment {
  margin-bottom: 10px;
}

.comment__user-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.comment__user-name {
  font-size: 16px;
  margin-right: 5px;
}

.comment__time {
  font-size: 12px;
}

.comment {
  display: flex;
  font-size: 14px;
}

.comment__header {
  display: flex;
  align-items: baseline;
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