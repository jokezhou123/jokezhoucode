import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

const state = {
  loading: false,
  isF: false,
  isLogin: false,
  nav: []
}
const actions = {
  SETNAV(context,value){
    context.commit('SETNAV',value)
  },
  isLogin(context,value){
    context.commit('isLogin',value)
  }
}
const mutations = {
  SETNAV(state,value){
    state.nav = value
    //console.log('mutations中的nav',value)
  },
  isLogin(state,value){
    state.isLogin = value
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
