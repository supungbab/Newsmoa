<template>
    <article>
          <router-link to="/detail" class="news">
            <img
              src="https://source.unsplash.com/random"
              alt=""
              class="news__img"
            />
            <div class="news__text-wrap">
              <h1 class="news__title">
                메타버스 열풍…MZ세대가 끌고 게임업계가 주도한다
              </h1>
              <p class="news__contents">
                지속성·동시적 참여·독자적 경제체계 등 현실과 경계 없는 가상세계
                게임 소셜미디어처럼 이해하는 MZ세대 메타버스 주도
              </p>

              <div class="news__info">
                <div>
                  <span class="news__press">매일경제</span>
                  <span class="news__time">11시간 전</span>
                </div>
                <div>
                  <span class="news__comment">
                    <span class="blind">댓글</span>
                    <span class="cnt">5</span>
                  </span>
                  <span class="news__like">
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
    name: 'News'
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
  position: relative;
  margin: 0 10px;
}

.news__info {
  position: absolute;
  bottom: 0;
  font-size: 14px;
}

.news__info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.news__comment,
.news__like,
.news__time {
  position: relative;
  padding-left: 15px;
}

.news__comment,
.news__like {
  margin-left: 15px;
}

.news__time::before {
  content: '';
  position: absolute;
  width: 13px;
  height: 13px;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  background: url(../assets/image/icon/clock.svg);
  background-size: 13px;
}

.news__comment::before {
  content: '';
  position: absolute;
  width: 13px;
  height: 13px;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  background: url(../assets/image/icon/comment.svg);
  background-size: 13px;
}

.news__like::before {
  content: '';
  position: absolute;
  width: 13px;
  height: 13px;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  background: url(../assets/image/icon/heart.svg);
  background-size: 13px;
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