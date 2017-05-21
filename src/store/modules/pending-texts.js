import pendingTexts from '../../api/pending-texts'
import * as types from '../mutation-types'

const state = {
  all: [],
  acceptedTexts: [],
  refusedTexts: [],
  panDirection: null
}

const getters = {
  allPendingTexts: state => state.all,
  acceptedTexts: state => state.acceptedTexts,
  refusedTexts: state => state.refusedTexts,
  panDirection: state => state.panDirection
}

const actions = {
  getAllPendingTexts ({ commit }) {
    pendingTexts.getPendingTexts(pendingTexts => {
      commit(types.RECEIVE_PENDING_TEXTS, { pendingTexts })
    })
  },

  addAcceptedText ({ commit }, textId) {
    commit(types.ADD_ACCEPTED_TEXT, { textId })
  },

  addRefusedText ({ commit }, textId) {
    commit(types.ADD_REFUSED_TEXT, { textId })
  },

  changePanDirection ({ commit }, direction) {
    commit(types.CHANGE_PAN_DIRECTION, { direction })
  }
}

const mutations = {
  [types.RECEIVE_PENDING_TEXTS] (state, { pendingTexts }) {
    state.all = pendingTexts
  },

  [types.ADD_ACCEPTED_TEXT] (state, { textId }) {
    state.acceptedTexts.push(textId)
  },

  [types.ADD_REFUSED_TEXT] (state, { textId }) {
    state.refusedTexts.push(textId)
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
