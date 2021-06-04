<template>
    <nav class="gnb">
        <ul class="gnb__menu">
          <li class="active"><router-link to="/">종합</router-link></li>
          <li><router-link to="/">정치</router-link></li>
          <li><router-link to="/">경제</router-link></li>
          <li><router-link to="/">사회</router-link></li>
          <li><router-link to="/">생활/문화</router-link></li>
          <li><router-link to="/">세계</router-link></li>
          <li><router-link to="/">IT/과학</router-link></li>
        </ul>

        <form action="" class="gnb__search">
          <input type="text" class="input__sm"/>
          <button type="submit" class="btn__search">
            <span class="blind">검색</span>
          </button>
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

.gnb__menu a:not(.gnb__menu .active a) {
  transition: color ease-in .2s;
}

.gnb__menu a:hover {
  color: var(--primary-color);
}

.gnb__menu .active a {
  font-weight: bold;
  color: var(--primary-color);
  cursor: default;
}

.gnb__search {
  position: relative;
  display: flex;
}

.btn__search {
  background: transparent;
  border: 0;
}

.btn__search::before {
  position: absolute;
  content: '';
  width: 15px;
  height: 15px;
  top: 50%;
  right: 20px;
  transform: translate(0%, -50%);
  background: url(../../assets/image/icon/search.svg);
  background-size: 15px;
}

@media (max-width: 700px) {
  .gnb__menu {
    width: 100%;
  }
  
  .gnb__search {
    display: none;
  }
}
</style>