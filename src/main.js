import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig/firebaseConfig"
import store from './store'

const app = initializeApp(firebaseConfig);


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
