<template>
  <ValidationProvider :rules="rules" :field="field" :vid="vid" 
                      v-slot="{ errors, validated, invalid }" class="input-group">

    <label v-text="prettyName"></label>
    <input :type="type" :name="field" :value="value" v-model="innerValue"
            class="input" :class="{'input--error' : validated && invalid }">
    <span class="msg--error">{{ errors[0] }}</span>

  </ValidationProvider>
</template>

<script>
import { ValidationProvider, localize, extend} from 'vee-validate';
import { required, max, min, email, confirmed, alpha_dash } from 'vee-validate/dist/rules';
import ko from 'vee-validate/dist/locale/ko.json'

const attrs = {
  id: '아이디',
  password: '비밀번호',
  passwordConfirm: '비밀번호 확인',
  name: '이름',
  nkName: '닉네임 ',
  birth: '생일',
  sex: '성별',
  email: '이메일',
  number: '전화번호'
}

localize('ko', ko);
localize({
  ko: {
    names: attrs,
    messages: {
      required: '필수 입력항목입니다.',
      min: '최소 {length}글자 이상 입력해주세요.',
      email: '이메일 형식으로 입력해주세요.',
      confirmed: '비밀번호와 일치하지 않습니다.'
    }
  }
})

extend('required', { ...required });
extend('max', { ...max });
extend('min', { ...min });
extend('email', { ...email });
extend('confirmed', {...confirmed});
extend('alpha_dash', {...alpha_dash});

extend('birth', {
  validate: value => {
    let regex = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (!regex) {
      return 'YYYY-MM-DD 형식으로 입력해주세요.';
    } else {
      return true;
    }
  }
});
extend('phone', {
  validate: value => {
    let regex = /^\d{3}-\d{3,4}-\d{4}$/.test(value);
    if (!regex) {
      return '01X-XXX-XXXX 형식으로 입력해주세요.';
    } else {
      return true;
    }
  }
});

export default {
  name: 'TextInput',
  components: {
    ValidationProvider
  },
  data() {
    return {
      innerValue: ''
    }
  },
  props: {
    value: {
      required: true,
      default: ''
    },
    rules: {
      type: [String, Object],
      default: ''
    },
    field: {
      type: String,
      required: true,
      default: ''
    },
    vid: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  watch: {
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  computed: {
    prettyName() {  // 속성명 (한글)
      return attrs[this.fieldName];
    },
    fieldName() {   // 속성명 (영문)
      return this.field.includes('.') ? this.field.substring(this.field.indexOf('.') + 1) : this.field;
    }
  }
}
</script>