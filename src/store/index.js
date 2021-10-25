import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import menu from './modules/menu'
import patient from './modules/patient'
import settings from './modules/settings'


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    menu,
    patient,
    settings
  }
})
