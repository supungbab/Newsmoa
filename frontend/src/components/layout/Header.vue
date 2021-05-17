<template>
    <header class="header">
        <div>
          <h1 class="header__logo">
            <router-link to="/">
              <span class="blind">뉴스모아</span>
            </router-link>
          </h1>

          <div class="header__text">
            <span class="date">2021/05/09 (토)</span>
          </div>
        </div>

        <div class="header__btn-group">
          <button type="button">
            <span> 다크모드 </span>
          </button>
          <button class="btn" @click="showModal">로그인</button>
          <button class="btn btn--primary">회원가입</button>
        </div>
        <LoginModal @close="closeModal" v-if="modal"/>
      </header>
</template>

<script>
import LoginModal from '@/components/login.vue'

export default {
    name: 'Header',
    components: {
      LoginModal
    },
    data() {
      return {
        modal: false,
        message: ''
      }
    },
    methods: {
      showModal() {
        this.modal = true
      },
      closeModal() {
        this.modal = false
      }
    }
    
}

</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
  align-items: baseline;
}

.header__logo {
  display: inline-block;
  margin: 20px 0 10px;
}

.header__logo a::before {
  display: inline-block;
  content: '';
  width: 100px;
  height: 30px;
  vertical-align: middle;
  background: url(../../assets/image/logo.png) center center no-repeat;
  background-size: 100px;
}

.header__text {
  display: inline-block;
  padding-left: 10px;
  font-size: 14px;
}
</style>