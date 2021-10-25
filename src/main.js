// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import VueMq from 'vue-mq'
import moment from 'moment-timezone'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSVGIcon from 'vue-svgicon'
import VeeValidate, { Validator } from 'vee-validate'
import VueCookie from 'vue-cookie'
import sv from 'vee-validate/dist/locale/sv'
import {dictionary} from './validation/dictionary.js'
import translations from './translations'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Localize takes the locale object as the second argument (optional) and merges it.
moment.tz.setDefault('SE')
Vue.use(VueAxios, axios)
Vue.component(VueCtkDateTimePicker);
Vue.use(VueSVGIcon)
Vue.use(VueI18n)
Vue.use(BootstrapVue);
Vue.use(VeeValidate)
Vue.use(VuejsDialog);
Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity
  }
})
Vue.use(VueCookie);

Validator.localize('sv', sv)
Validator.localize(dictionary)

Object.defineProperty(Vue.prototype, '$moment', {get () { return this.$root.moment }})

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:12866/'
axios.defaults.timeout = 5000

axios.interceptors.response.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  if (error.response) {
    // Do something with request error
    // Do something with response error
    if (error.response.status === 401) {
      console.log('unauthorized, logging out ...')
      Vue.auth.destroyToken()
      router.replace('/login')
    }
  }
  return Promise.reject(error)
})

// export const HTTP = axios.create({
//   baseURL: 'http://docuraeapi.azurewebsites.net/',
//   timeout: 3000
//   });

const i18n = new VueI18n({
  locale: 'se',
  fallbackLocale: 'se',
  messages: translations,
  silentTranslationWarn: false
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.forVisitors)) {
    if (Vue.auth.isAuthenticated()) {
      next({ path: '/' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.forAuth)) {
    // if (!Vue.auth.isAuthenticated()) {
      if (false) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  data: {moment},
  i18n,
  router,
  template: '<App/>',
  components: { App },
  store,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.$i8n = i18n

