<template>
    <header class="header">
        <div>
          <h1 class="header__logo">
            <a href='/' @click="check">
              <span class="blind">뉴스모아</span>
            </a>
          </h1>

          <div class="header__text">
            <!--<span class="date">2021/05/09 (토)</span>-->
          </div>
        </div>

        <div v-if="isLogin" class="header__btn-group">
          <router-link to="/myPage" class="btn--primary text__sm">마이페이지</router-link>
          <button @click="logout" class="btn text__sm">로그아웃</button>
        </div>

        <div v-if="!isLogin" class="header__btn-group">
          <button id="btn-openLogin" class="btn" @click="showModal($event)">로그인</button>
          <button id="btn-openSignup" class="btn--primary" @click="showModal($event)">회원가입</button>
        </div>
        <LoginModal @close="closeModal" @switch="switchModal" v-if="loginModal"/>
        <SignupModal @close="closeModal" @switch="switchModal" v-if="signupModal"/>
      </header>
</template>

<script>
import LoginModal from '@/views/login.vue'
import SignupModal from '@/views/Signup.vue'
import * as usersApi from '@/api/UsersApi';

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
        isLogin: false
      }
    },
    created(){
      //localStorage.setItem('category','')
      if(this.$cookies.get("userToken")==undefined)
        this.isLogin=false;
      else{
        usersApi.auth(this.$cookies.get("userToken")).then(res =>{
          if(res.data.me){
            this.isLogin=true;
            this.$cookies.set('user',res.data.me.id);
            this.$cookies.set('nickname',res.data.me.nickname);
            //console.log(res.data.me)
          }
        }).catch(err=>{
          console.log(err)
          this.isLogin=false;
        })
      }
    },
    methods: {
      showModal(event) {
        if (event.currentTarget.id === 'btn-openLogin') this.loginModal = true;
        if (event.currentTarget.id === 'btn-openSignup') this.signupModal = true;
      },
      closeModal(isLogin) {
        console.log(isLogin)
        this.isLogin = isLogin;
        this.loginModal = false;
        this.signupModal = false;
      },
      switchModal() {
        this.loginModal = !this.loginModal;
        this.signupModal = !this.signupModal;
      },
      //로그아웃 버튼 클릭시 쿠키에 있는 해당 데이터를 삭제한 후 메인으로 이동한다.
      logout(){
        this.$cookies.remove("userToken");
        this.$cookies.remove('user');
        this.$cookies.remove('nickname');
        this.isLogin = false;
        this.$router.push("/");
      },
      check(){
        localStorage.setItem('category','')
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