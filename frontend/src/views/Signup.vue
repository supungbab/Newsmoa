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
                <ValidationObserver v-slot="{ passes }">
                    <form class="modal__form" @submit.prevent="passes(nextStep)">
                        <div id="step1" v-if="currentStep === 1">
                            <TextInput v-model="user.id" field="id" rules="required|alpha_dash" />
                            <TextInput v-model="user.password" field="password" vid="password" type="password" rules="required|min:6|alpha_dash"  />
                            <TextInput v-model="user.passwordConfirm" field="passwordConfirm" type="password" rules="required|alpha_dash|confirmed:password" />
                        </div>
                        
                        <div id="step2" v-if="currentStep === 2">
                            <TextInput v-model="user.name" field="name" rules="required" />
                            <TextInput v-model="user.birth" field="birth" type="date" rules="required|birth" />

                            <Validation-provider rules="required" v-slot="{ errors }" class="input-group">
                                <div>성별</div>
                                <input type="radio" id="male" name="sex" value="1" v-model="user.sex" />
                                <label for="male">남</label>
                                <input type="radio" id="female" name="sex" value="0" v-model="user.sex" />
                                <label for="female">여</label>
                                <div class="msg--error">{{ errors[0] }}</div>
                            </Validation-provider>

                            <TextInput v-model="user.email" field="email" type="email" rules="required|email" />
                            <TextInput v-model="user.number" field="number" rules="phone" />
                        </div>

                        <button type="button" @click.prevent="nextStep" v-if="currentStep === 1" class="btn">다음</button>
                        <div v-if="currentStep === 2">
                            <button type="button" @click.prevent="prevStep" class="btn">이전</button>
                            <button type="submit" class="btn--primary">회원가입</button>
                        </div>
                    </form>
                </ValidationObserver>
            </div>

            <button class="modal__close-btn" @click="$emit('close')">
                <span class="blind">창 닫기</span>
            </button>
        </div>
    </div>
</transition>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import TextInput from '@/components/TextInput'


export default {
    name: 'SignupModal',
    components: {
        ValidationObserver,
        ValidationProvider,
        TextInput
    },
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
    computed: {
        isLastStep() {
            return this.currentStep === 2;
        }
    },
    methods : {
        nextStep() {
            if (this.isLastStep) {
                return this.onSubmit();
            }
            this.currentStep++;
        },
        prevStep() {
            this.currentStep--;
        },
        onSubmit() {
            console.log(this.user);
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