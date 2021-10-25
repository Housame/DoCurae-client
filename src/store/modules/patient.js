const state = {
    patientName:undefined,
    patientId:undefined,
    patientSSN:undefined,
    patientSectionName:undefined,
    patientSectionId:undefined,
    mainSection:undefined
};

const mutations = {
    setPatientName(state, payload) {
        state.patientName = payload
    },
    resetPatientName(state) {
        state.patientName = undefined
    },

    setPatientId(state, payload) {
        state.patientId = payload
    },
    resetPatientId(state) {
        state.patientId = undefined
    },

    setPatientSSN(state, payload) {
        state.patientSSN = payload
    },
    resetPatientSSN(state) {
        state.setPatientSSN = undefined
    },

    setPatientSectionName(state, payload) {
        state.patientSectionName = payload
    },
    resetPatientSectionName(state) {
        state.patientSectionName = undefined
    },

    setPatientSectionId(state, payload) {
        state.patientSectionId = payload
    },
    resetPatientSectionId(state) {
        state.patientSectionId = undefined
    },

    setMainSection(state, payload) {
        state.mainSection = payload
    },
    resetMainSection(state) {
        state.mainSection = undefined
    },
};
const getters = {
    patientName: state =>{
        return state.patientName;
    },
    patientId: state =>{
        return state.patientId;
    },
    patientSSN: state =>{
        return state.patientSSN;
    },
    patientSectionName: state =>{
        return state.patientSectionName;
    },
    patientSectionId: state =>{
        return state.patientSectionId;
    },
    mainSection: state =>{
        return state.mainSection;
    },

};
const actions = {
    setPatientName: ({ commit }, payload)=>{
        commit('setPatientName',payload);
    },
    resetPatientName: ({ commit }) =>{
        commit('resetPatientName',undefined);
    },

    setPatientId: ({ commit }, payload)=>{
        commit('setPatientId',payload);
    },
    resetPatientId: ({ commit }) =>{
        commit('resetPatientId',undefined);
    },

    setPatientSectionId: ({ commit }, payload)=>{
        commit('setPatientSectionId',payload);
    },
    resetPatientSectionId: ({ commit }) =>{
        commit('resetPatientSectionId',undefined);
    },

    setPatientSSN: ({ commit }, payload)=>{
        commit('setPatientSSN',payload);
    },
    resetPatientSSN: ({ commit }) =>{
        commit('resetPatientSSN',undefined);
    },

    setPatientSectionName: ({ commit }, payload)=>{
        commit('setPatientSectionName',payload);
    },
    resetPatientSectionName: ({ commit }) =>{
        commit('resetPatientSectionName',undefined);
    },

    setMainSection: ({ commit }, payload)=>{
        commit('setMainSection',payload);
    },
    resetMainSection: ({ commit }) =>{
        commit('resetMainSection',undefined);
    },
};
export default{
    state,
    mutations,
    actions,
    getters
}