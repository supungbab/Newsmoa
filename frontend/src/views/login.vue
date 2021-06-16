<template>
  <transition name="modal-t" appear>
    <div class="wrap--modal">
      <div class="modal">
        <div class="modal__aside">
          <h1>환영합니다!</h1>
          <p>
            아직 회원이 아니신가요?
            <button type="button" class="btn--link"  @click="$emit('switch')">회원가입</button>
          </p>
          <img src="../assets/image/welcome.png" alt="" />
        </div>
        <div class="modal__contents">
          <h1 class="modal__title">로그인</h1>

          <form method="post" class="modal__form">
            <div class="input-group">
              <label for="id">아이디</label>
              <input type="text" id="id" class="input" v-model="id" />
            </div>

            <div class="input-group">
              <label for="password">비밀번호</label>
              <input type="password" id="password" class="input" v-model="password" />
            </div>

            <button type="button" @click="login" class="btn btn--primary">로그인</button>
          </form>
        </div>

        <button class="modal__close-btn" @click="$emit('close')">
          <span class="blind">창 닫기</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import * as authApi from '@/api/auth'
import * as usersApi from '@/api/UsersApi';

export default {
  name: 'LoginModal',
  data() {
    return {
      id: '',
      password: '',
      isLogin: false
    }
  },
  methods: {
    login() {
      authApi.login(this.id, this.password).then(res => {
        console.log('res',res.status,res.data);
        if(res.status==201){
          this.$cookies.set('userToken',res.data.token);
          usersApi.auth(res.data.token).then(res =>{
            if(res.data.me){
              this.$cookies.set('user',res.data.me.id);
              this.$cookies.set('nickname',res.data.me.nickname);
              this.isLogin = true;
              this.$emit('close', this.isLogin);
              //console.log(res.data.me)
            }
          }).catch(err=>{
            console.log(err)
            alert('아이디나 비밀번호를 확인해주세요.')
          })
          //this.$cookies.set('userToken',res.data.token);
          //this.$cookies.set('user',this.id);
          //this.$cookies.set('nickname',res.data.me.nickname);
          //this.isLogin = true;
          //this.$emit('close', this.isLogin);
        }
        else{
          alert('아이디나 비밀번호를 확인해주세요.')
        }
      }).catch(err => {
        alert('아이디나 비밀번호를 확인해주세요.')
        console.log(err);
      })
    }
  }
}
</script>