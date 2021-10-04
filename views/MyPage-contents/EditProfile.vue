<template>
<ValidationObserver v-slot="{ passes }">
  <form class="modal__form" @submit.prevent="passes(onSubmit)">
    <TextInput v-model="user.pw" field="password" vid="password" type="password" rules="required|min:7|alpha_dash"  />
    <TextInput v-model="pwConfirm" field="passwordConfirm" type="password" rules="required|alpha_dash|confirmed:password" />
    <TextInput v-model="user.nickname" field="nkName" rules="required" />
    
    <TextInput v-model="user.name" field="name" rules="required" />
    <TextInput v-model="user.birth" field="birth" type="date" max="9999-12-31" rules="required|birth" />

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

    <button type="reset" class="btn">초기화</button>
    <button type="submit" class="btn--primary">저장</button>
  </form>
</ValidationObserver>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import * as usersApi from '@/api/UsersApi';

export default {
  name: 'EditProfile',
  components: {
    ValidationObserver,
    ValidationProvider,
    TextInput
  },
  data() {
    return {
      pwConfirm: '',
      user: {
        id: '',
        pw: '',
        nickname: '',
        name: '',
        birth: '',
        sex: '',
        email: '',
        number: ''
      }
    }
  },
  methods: {
    onSubmit() {
      usersApi.meUpdate(this.user,this.$cookies.get("userToken")).then(res=>{
        console.log(res.data)
        alert('회원정보 수정 완료');
        window.location.reload()
      }).catch(err=>{
        console.log(err);
        alert('회원정보 입력 오류');
      })
    }
  },
  created(){
    usersApi.auth(this.$cookies.get("userToken")).then(res =>{
      if(res.data.me){
        this.user.id=res.data.me.id
        this.user.nickname=res.data.me.nickname
        this.user.name=res.data.me.name
        this.user.birth=res.data.me.birth
        this.user.sex=res.data.me.sex
        this.user.email=res.data.me.email
        this.user.number=res.data.me.number
        //console.log(res.data.me)
      }
    }).catch(err=>{
      console.log(err);
    });
  },
}
</script>