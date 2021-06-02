<template>
    <div class="trending">
      <span class="trending__rank">1</span>
      <div class="trending__text">
        <a href="" class="trending__catagory">정치</a>
        <a href="" class="trending__title">
          뉴스 타이틀 뉴스 타이틀 뉴스 타이틀 뉴스 타이틀 뉴스 타이틀
        </a>
        <span class="trending__time news__time">
          <span class="icon__time blind"></span>11시간 전
        </span>
      </div>
    </div>
           
</template>

<script>
export default {
    name: 'NewsTrending',
    props: {
      count: {
        default: 0
      }
    }
}
</script>

<style scoped>
.trending {
  display: flex;
  padding: 10px 0;
}

.trending li:nth-child(even) {
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
}

.trending__rank {
  font-size: 20px;
  margin: 0 10px;
  font-style: italic;
}

.trending__text {
  width: 90%;
  margin-top: 6px;
}

.trending__catagory {
  display: block;
  font-size: 13px;
}

.trending__time {
  display: block;
  margin: 3px 0 5px;
  font-size: 12px;
}

.trending__title {
  font-size: 18px;
  font-weight: bold;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>