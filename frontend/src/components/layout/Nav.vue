<template>
    <nav class="gnb">
        <ul class="gnb__menu">
          <li class="active"><router-link to="/">추천</router-link></li>
          <li><router-link to="/">정치</router-link></li>
          <li><router-link to="/">경제</router-link></li>
          <li><router-link to="/">사회</router-link></li>
          <li><router-link to="/">국제</router-link></li>
          <li><router-link to="/">연예</router-link></li>
          <li><router-link to="/">문화</router-link></li>
        </ul>

        <form action="" class="gnb__search">
          <input type="text" />
          <button type="submit">검색</button>
        </form>
      </nav>
</template>

<script>
export default {
    name: 'Nav'
}
</script>

<style scoped>
.gnb {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 45px;
}

.gnb__menu {
  display: flex;
  box-sizing: border-box;
  list-style: none;
}

.gnb__menu li {
  box-sizing: border-box;
  width: 100px;
  line-height: 45px;
}

.gnb__menu .active a {
  font-weight: bold;
  color: var(--primary-color);
}
</style>