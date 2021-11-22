import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from "vue-cookies" //쿠키 사용
Vue.use(VueCookies);
Vue.$cookies.config("1h")

Vue.config.productionTip = false
import io from 'socket.io-client';

//https://blog.joonas.io/62 소켓 로그 해결
//https://github.com/socketio/socket.io-client/issues/1097#issuecomment-301301030 참고 문헌

//https://warlord0blog.wordpress.com/2018/07/18/vue-cli-3-and-hmr/

const serverURL='http://192.168.219.106:8082'
const socket = io.connect(serverURL, { transports: ['websocket'] });
Vue.prototype.$socket = socket;

const serverURL2='http://192.168.219.106:8083'
const socket2 = io.connect(serverURL2, { transports: ['websocket'] });
Vue.prototype.$socket2 = socket2;
//console.log(socket)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
