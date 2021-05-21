<template>
<transition name="modal-t" appear>
    <div class="wrap--modal">
        <div class="modal">
            <div class="modal__aside">
                <h1>환영합니다!</h1>
                <p>
                    계정이 이미 있으신가요?
                    <button type="button" class="btn--link"  @click="$emit('switch')">로그인</button>
                </p>
                <img src="../assets/image/welcome.png" alt="" />
            </div>
            <div class="modal__contents">
                <h1 class="modal__title">회원가입</h1>

                <form class="modal__form">
                    <div id="step1" v-if="currentStep == 1">
                        <div class="input-group">
                            <label for="id">아이디</label>
                            <input type="text" id="id" class="input" v-model="user.id" />
                        </div>
                        <div class="input-group">
                            <label for="password">비밀번호</label>
                            <input type="password" id="password" class="input" v-model="user.password" />
                        </div>

                        <div class="input-group">
                            <label for="passwordConfirm">비밀번호 확인</label>
                            <input type="password" id="passwordConfirm" class="input" v-model="user.passwordConfirm" />
                        </div>

                        <button type="button" @click.prevent="goToStep(2)" class="btn">다음</button>
                    </div>
                    
                    <div id="step2" v-if="currentStep == 2">
                        <div class="input-group">
                            <label for="name">이름</label>
                            <input type="text" id="name" class="input" v-model="user.name" />
                        </div>
                        
                        <div class="input-group">
                            <label for="birth">생일</label>
                            <input type="date" id="birth" class="input" v-model="user.birth" />
                        </div>

                        <div class="input-group">
                            <div>성별</div>
                            <input type="radio" id="male" name="sex" value="0" v-model="user.sex" />
                            <label for="male">남</label>
                            <input type="radio" id="female" name="sex" value="1" v-model="user.sex" />
                            <label for="female">여</label>
                        </div>

                        <div class="input-group">
                            <label for="email">이메일</label>
                            <input type="email" id="email" class="input" v-model="user.email" />
                        </div>

                        <div class="input-group">
                            <label for="number">전화번호</label>
                            <input type="tel" id="number" class="input" v-model="user.number" />
                        </div>

                        <button type="button" @click.prevent="goToStep(1)" class="btn">이전</button>
                        <button type="submit" class="btn--primary">회원가입</button>
                    </div>
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
    name: 'SignupModal',
    data() {
        return {
            currentStep: 1,
            user: {
                id: '',
                password: '',
                passwordConfirm: '',
                name: '',
                birth: '',
                sex: '',
                email: '',
                number: ''
            }
        }
    },
    methods : {
        goToStep(num) {
            this.currentStep = num;
        }
    }
}
</script>


<style scoped>
.btn {
    background-color: #f1f3f5;
    margin-right: 10px;
}
</style>