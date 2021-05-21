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
          <button id="btn-openLogin" class="btn" @click="showModal($event)">로그인</button>
          <button id="btn-openSignup" class="btn--primary" @click="showModal($event)">회원가입</button>
        </div>
        <LoginModal @close="closeModal" @switch="switchModal" v-if="loginModal"/>
        <SignupModal @close="closeModal" @switch="switchModal" v-if="signupModal"/>
      </header>
</template>

<script>
import LoginModal from '@/components/login.vue'
import SignupModal from '@/components/Signup.vue'

export default {
    name: 'Header',
    components: {
      LoginModal,
      SignupModal
    },
    data() {
      return {
        loginModal: false,
        signupModal: false,
        modalId: ''
      }
    },
    methods: {
      showModal(event) {
        if (event.currentTarget.id === 'btn-openLogin') this.loginModal = true;
        if (event.currentTarget.id === 'btn-openSignup') this.signupModal = true;
      },
      closeModal() {
        this.loginModal = false;
        this.signupModal = false;
      },
      switchModal() {
        this.loginModal = !this.loginModal;
        this.signupModal = !this.signupModal;
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

@media (max-width: 700px) {
  .header__text {
    display: none;
  }
}
</style>