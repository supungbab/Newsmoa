<template>
<transition name="modal-t" appear>
    <div class="wrap--modal" @click.self="$emit('close')">
        <div class="modal">
            <div class="modal__aside">
                <img src="../assets/image/login.png" alt="" />
            </div>
            <div class="modal__contents">
                <h1 class="modal__title">로그인</h1>
                <form action="" class="modal__form">
                    <div class="input-group">
                        <label for="input__id" :class="{ active: isIdActive }" >
                            아이디
                        </label>
                        <input type="text" id="input__id" class="input" v-model="id_value" @focus="toggleId" @blur="toggleId"/>
                    </div>
                    <div class="input-group">
                        <label for="input__pw" :class="{ active: isPwActive }" >
                            비밀번호
                        </label>
                        <input type="password" id="input__pw" class="input" v-model="pw_value"  @focus="togglePw" @blur="togglePw"/>
                    </div>
                    <button type="submit" class="btn btn--primary">로그인</button>
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
export default {
    name: 'LoginModal',
    data() {
        return {
            id_value: '',
            pw_value: '',
            isIdActive: false,
            isPwActive: false,
            isModalActive: false
        }
    },
    methods : {
        toggleId() {
            if (this.id_value != '') this.isIdActive = false;
            this.isIdActive = !this.isIdActive
        },
        togglePw() {
            if (this.pw_value != '') this.isPwActive = false;
            this.isPwActive = !this.isPwActive
        }
    }
}
</script>


<style scoped>

.input-group {
  position: relative;
  width: 100%;
  margin: 10px 0;
}

.input-group label {
  position: absolute;
  top: 10px;
  left: 8px;
  opacity: 0.8;
  transition: ease-in 0.1s;
}

.input-group label.active {
  top: 2px;
  font-size: 11px;
}

.input-group .input {
  width: 100%;
  height: 48px;
  vertical-align: middle;
}
</style>