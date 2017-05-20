import pendingTexts from '../../api/pending-texts'
import * as types from '../mutation-types'

const state = {
  all: [],
  panDirection: null
}

const getters = {
  allPendingTexts: state => state.all,
  panDirection: state => state.panDirection
}

const actions = {
  getAllPendingTexts ({ commit }) {
    pendingTexts.getPendingTexts(pendingTexts => {
      commit(types.RECEIVE_PENDING_TEXTS, { pendingTexts })
    })
  },

  changePanDirection ({ commit }, direction) {
    commit(types.CHANGE_PAN_DIRECTION, { direction })
  }
}

const mutations = {
  [types.RECEIVE_PENDING_TEXTS] (state, { pendingTexts }) {
    state.all = pendingTexts
  },

  [types.CHANGE_PAN_DIRECTION] (state, { direction }) {
    state.panDirection = direction
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
