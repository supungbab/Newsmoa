import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import io from 'socket.io-client';
import VueCookies from "vue-cookies";
//쿠키를 사용한다.
Vue.use(VueCookies);

//쿠키의 만료일은 7일이다. (글로벌 세팅)
Vue.$cookies.config("7d");

//https://blog.joonas.io/62 소켓 로그 해결
//https://github.com/socketio/socket.io-client/issues/1097#issuecomment-301301030 참고 문헌
const serverURL='http://localhost:8082'
const socket = io.connect(serverURL, { transports: ['websocket'] });
Vue.prototype.$socket = socket;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
