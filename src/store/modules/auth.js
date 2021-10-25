import Vue from 'vue'
import router from '@/router'

const _logoutTime = 900;
const _notifyTime = 180;

export const authStore = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        showInactive: false,
        secondsLeft: 0,
        tokenLife:0
    },
    mutations: {
        tokenLife (state, value) {
            // mutate state
            state.tokenLife = value;
          },
          setAuth (state, value) {
            // mutate state
            state.isAuthenticated = value;
          },
          showInactive (state, value) {
            // mutate state
            state.showInactive = value;
          },
          setSecondsLeft (state, value) {
            // mutate state
            state.secondsLeft = value;
          },
          decrementSecondsLeft (state) {
            // mutate state
            if (state.secondsLeft > 0) state.secondsLeft--;
            state.showInactive = (state.secondsLeft <= _notifyTime && state.secondsLeft > 0 && state.isAuthenticated)
          }


    },
    actions: {
        login: ({commit}, user) => {
            return new Promise((resolve, reject) => { // The Promise used for router redirect in login
           //   commit(AUTH_REQUEST)
                Vue.axios.post('login/token', user)
                .then( resp => {
                    Vue.auth.setToken(resp.data.token,resp.data.expiration + Date.now());
                    commit("setSecondsLeft", _logoutTime);
                    commit("showInactive", false);
                    commit("setAuth", true);
                    // commit(AUTH_SUCCESS, token)
                    // you have your token, now log in your user :)
                    // dispatch(USER_REQUEST)
                    resolve(resp)
                }).catch( err => {
                    // commit(AUTH_ERROR, err)
                    Vue.auth.destroyToken();
                    commit("setSecondsLeft", 0);
                    commit("setAuth", false)
                    reject(err)
                })
            })
        },
        refresh: ({commit, rootGetters}) => {
            return new Promise((resolve, reject) => {
                var refresh = { UserName: "" };
                refresh.UserName = rootGetters['settings/email'];

                Vue.axios.post('login/refresh', refresh)
                .then( resp => {
                    Vue.auth.setToken(resp.data.token,resp.data.expiration + Date.now());
                    commit("setAuth", true);
                    resolve(resp)
                }).catch( err => {
                    Vue.auth.destroyToken();
                    commit("setSecondsLeft", 0);
                    commit("setAuth", false)
                    reject(err)
                })
            })
        },
        logoff({commit, dispatch}) {
            commit("setSecondsLeft", 0);
            Vue.auth.destroyToken();
            commit("setAuth", false)
            dispatch("menu/setLoggedIn",false, {root:true});
            dispatch("settings/logoff", null, {root:true});
            router.push("/Login");
        },
        setLogoutTime({commit}) {
            commit("setSecondsLeft", _logoutTime);
        },
        reportActivity({commit, state}) {
            if (state.secondsLeft > _notifyTime) {
                 commit("setSecondsLeft", _logoutTime);
            }
        },
        oneSecondTick({commit, dispatch, state}) {
            var cnt = state.secondsLeft;
            commit("decrementSecondsLeft");
            if (cnt == 1) dispatch("logoff");
            var expiration = localStorage.getItem('expiration')
            if (state.isAuthenticated && Date.now() > (expiration-300000)) {
                dispatch("refresh");
            }
            commit("tokenLife", (expiration - Date.now())/1000)
        }

    },
    getters: {
        secondsLeft: state =>{
            return state.secondsLeft;
        },
        inactiveTime: state =>{
            return _logoutTime - _notifyTime;
        },
    }
}
