import pendingTexts from '../../api/pending-texts'
import * as types from '../mutation-types'

const state = {
  all: []
}

const getters = {
  allPendingTexts: state => state.all
}

const actions = {
  getAllPendingTexts ({ commit }) {
    pendingTexts.getPendingTexts(pendingTexts => {
      commit(types.RECEIVE_PENDING_TEXTS, { pendingTexts })
    })
  }
}

const mutations = {
  [types.RECEIVE_PENDING_TEXTS] (state, { pendingTexts }) {
    state.all = pendingTexts
  }

//   [types.ADD_TO_CART] (state, { id }) {
//     state.all.find(p => p.id === id).inventory--
//   }
}

export default {
  state,
  getters,
  actions,
  mutations
}
