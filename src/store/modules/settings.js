const state = {
    settings:undefined
};

const mutations = {
    setSettings(state, payload) {
        state.settings = payload
    },
    resetLoggedIn(state) {
        state.settings = false
    }
};
const getters = {
    settings: state =>{
        return state.settings;
    }

};
const actions = {
    setSettings: ({commit},settings) => {
        commit('setSettings',settings)
    },
    resetLoggedIn: ({ commit }) =>{
        commit('resetSettings',undefined);
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}