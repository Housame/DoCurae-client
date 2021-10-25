const state = {
    isLoggedIn:false,
    routerOrder:1
};

const mutations = {
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload
    },
    resetLoggedIn(state) {
        state.isLoggedIn = false
    },
    setRouterOrder(state, payload) {
        state.routerOrder = payload
    },
    resetRouterOrder(state) {
        state.routerOrder = 1
    },
};
const getters = {
    isLoggedIn: state =>{
        return state.isLoggedIn;
    },
    routerOrder: state =>{
        return state.routerOrder;
    }

};
const actions = {
    setLoggedIn: ({ commit }, payload)=>{
        commit('setLoggedIn',payload);
    },
    resetLoggedIn: ({ commit }) =>{
        commit('resetLoggedIn',false);
    },
    setRouterOrder: ({ commit }, payload)=>{
        commit('setRouterOrder',payload);
    },
    resetRouterOrder: ({ commit }) =>{
        commit('resetRouterOrder',1);
    },
};
export default{
    state,
    mutations,
    actions,
    getters
}