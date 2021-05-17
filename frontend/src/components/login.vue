<template>

<transition name="modal" appear>
    <div class="wrap--modal" @click.self="$emit('close')">
        <div class="modal">
            <div class="modal__img">
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
.wrap--modal {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
}

.modal {
    position: fixed;
    display: flex;
    width: 600px;
    height: 480px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
}

.modal__img {
    width: 260px;
    line-height: 480px;
    background-color: var(--primary-color);
    margin: 0 auto;
}

.modal__img img {
    width: 100%;
    vertical-align: middle;
}

.modal__contents {
    width: 70%;
    box-sizing: border-box;
    padding: 40px;
}

.modal__form button{
    margin-top: 20px;
}

.modal__title {
    font-weight: normal;
    font-size: 25px;
    padding: 20px 0;
}

.modal__close-btn {
    height: 0;
    border: 0;
    background-color: transparent;
}

.modal__close-btn::before {
    position: absolute;
    display: inline-block;
    top: 0;
    right: 0;
    padding: 10px;
    content: '';
    width: 30px;
    height: 30px;
    background: url(../assets/image/icon/close.svg) center center no-repeat;
    background-size: 30px;
}
</style>