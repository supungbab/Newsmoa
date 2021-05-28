<template>
<transition name="modal-t" appear>
  <div class="wrap--modal" @click="$emit('close')">
    <div class="modal__sm">
      <div class="modal__contents">
        <h1 class="modal__title">설정</h1>

        <ol class="config__menu">
          <li>
            <router-link to='/'>로그아웃</router-link>
          </li>
          <li>
            <router-link to='/'>회원 탈퇴</router-link>
          </li>
        </ol>
      </div>

      <button class="modal__close-btn" @click="$emit('close')">
          <span class="blind">창 닫기</span>
      </button>
    </div>
  </div>
</transition>
</template>

<script>
export default {
    name: 'LoginModal',
    data() {
        return {
            id: '',
            password: '',
        }
    }
}
</script>

<style scoped>
.config__menu {
  list-style: none;
}

.config__menu li a {
  display: block;
  border-bottom: 1px solid var(--line-color-light);
  padding: 10px 0;
}
</style>