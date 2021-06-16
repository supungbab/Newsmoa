<template>
  <div>
    <div class="my-page__header">
      <dl class="user-info">
        <div>
          <dt class="blind">유저 이미지</dt>
          <dd>
            <img src="@/assets/image/default/user.png" alt="" class="user-info__img">
          </dd>
        </div>
        
        <div class="user-info__contents">
          <dt class="blind">이름</dt>
          <dd class="user-info__name">{{user.name}}</dd>

          <dt class="blind">아이디</dt>
          <dd class="text__sm">{{user.id}}</dd>

          <dt class="blind">이메일</dt>
          <dd class="text__sm">{{user.email}}</dd>
        </div>
      </dl>

      <button type="button" class="user-info__btn btn--config" @click="showModal">
        <span class="blind">
          설정
        </span>
      </button>
      <ConfigModal @close="closeModal" v-if="configModal"/>
    </div>

    <div class="wrap--main">
      <aside class="aside">
        <ol class="my-page__nav">
          <li>
            <button type="button" class="nav__item active">나의 댓글</button>
          </li>
          <li>
            <button type="button" class="nav__item">내가 좋아요한 뉴스</button>
          </li>
          <li>
            <button type="button" class="nav__item">개인 정보 수정</button>
          </li>
        </ol>
      </aside>
      
      <div class="main">
        <h1 class="main__title">내 정보</h1>
        <div class="main__contents"></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import ConfigModal from '@/views/MyPage-contents/ConfigModal.vue';
import * as usersApi from '@/api/UsersApi';

export default {
  name: 'MyPage',
  components: {
    ConfigModal
  },
  data() {
    return {
        configModal: false,
        user: {
            id: 'test123',
            password: '',
            passwordConfirm: '',
            name: '나래',
            birth: '2000-02-02',
            sex: '0',
            email: 'test@exmple.com',
            number: '010-1111-1111'
        }
    }
  },
  methods: {
    showModal() {
        this.configModal = true;
    },
    closeModal() {
      this.configModal = false;
    }
  },
  created(){
    usersApi.auth(this.$cookies.get("userToken")).then(res =>{
      if(res.data.me){
        this.user.id=res.data.me.id
        this.user.name=res.data.me.name
        this.user.birth=res.data.me.birth
        this.user.sex=res.data.me.sex
        this.user.email=res.data.me.email
        this.user.number=res.data.me.number
        console.log(res.data.me)
      }
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
.my-page__header {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.wrap--main {
  position: relative;
}

.main, .aside {
  margin: 0;
  padding: 0;
}

.aside {
  order: 0;
  width: 200px;
}

.aside::before {
  display: none;
}

.main {
  padding-left: 25px;
  width: 100%;
}

.main__title {
  font-size: 23px;
  border-bottom: 1px solid var(--line-color-light);
  padding-bottom: 10px;
  font-weight: normal;
}

.user-info {
  display: flex;
  width: 100%;
  justify-content: stretch;
}

.user-info__img {
  width: 100px;
  height: 100px;
  background-position: center;
  object-fit: cover;
}

.user-info__contents{
  padding-left: 10px;
  align-self: center;
}

.user-info__name {
  font-size: 25px;
  margin-bottom: 3px;
}

.user-info__btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
}

.btn--config {
  border: 0;
  background: transparent;
}

.btn--config::before {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  left: -20px;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url(../assets/image/icon/user-settings.png);
  background-size: 25px;
}


.my-page__nav {
  list-style: none;
  display: flex;
  width: 200px;
  flex-direction: column;
}

.my-page__nav li:first-child .nav__item {
  border-radius: 5px 5px 0 0;
}

.my-page__nav li:last-child .nav__item {
  border-radius: 0 0 5px 5px;
}

.nav__item {
  position: relative;
  width: 100%;
  border: 1px solid var(--line-color-light);
  background: #fff;
  padding: 9px 15px;
  font-size: 15px;
  text-align: left;
  margin-top: -1px;
}


.nav__item:hover:not(.nav__item.active) {
  background: #f6f8fa;
}

.nav__item.active::before {
  position: absolute;
  content: '';
  display: block;
  width: 2px;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--primary-color);
}


@media (max-width: 700px) {
  .wrap--main {
    flex-flow: column;
  }
  
  .main {
    padding-left: 0;
  }

  .aside {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }

  .my-page__nav {
    width: 100%;
  }
}

</style>
