<template>
  <article>
    <router-link :to="`detail/`+items.index" class="news">
      <img
        :src="items.topimg"
        alt=""
        class="news__img"
      />
      <div class="news__text-wrap">
        <h1 class="news__title">
          {{items.title}}
        </h1>
        
        <div class="news-bottom">
          <div class="news-bottom__left">
            <div class="news__press">{{items.media}}</div>
            <span class="news__time">
              <span class="icon__time blind"></span>{{items.date}}
            </span>
          </div>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
export default {
    name: 'NewsCompact',
    props : {
      items : {}
    }
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