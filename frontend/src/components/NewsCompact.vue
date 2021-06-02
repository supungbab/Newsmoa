<template>
  <article>
    <router-link to="/detail" class="news">
      <img
        src="@/assets/image/default/no_img.png"
        alt=""
        class="news__img"
      />
      <div class="news__text-wrap">
        <h1 class="news__title">
          메타버스 열풍…MZ세대가 끌고 게임업계가 주도한다
        </h1>
        
        <div class="news-bottom">
          <div class="news-bottom__left">
          <div class="news__press">매일경제</div>
          <span class="news__time">
            <span class="icon__time blind"></span>11시간 전
          </span>
        </div>

        <div class="news-bottom__right">
          <span class="icon__comment">
            <span class="blind">댓글</span>
            <span class="cnt">5</span>
          </span>
          <span class="icon__like">
            <span class="blind">좋아요</span>
            <span class="cnt">1</span>
          </span>
        </div>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
    name: 'NewsCompact'
}
</script>

<style scoped>
.news {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 90px;
  padding: 10px 0;
  border-bottom: 1px solid #dbdbdb;
}

.news__img {
  width: 100px;
  background-position: center;
  object-fit: cover;
}

.news__text-wrap {
  position: relative;
  width: 100%;
  margin: 0 10px;
}

.news-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 14px;
}

.news__title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 50px;
  line-height: 25px;
  font-size: 15px;
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

.news__time,
.news-bottom__right {
  font-size: 13px;
}

</style>