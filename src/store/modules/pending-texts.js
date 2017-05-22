import pendingTexts from '../../api/pending-texts'
import * as types from '../mutation-types'

const state = {
  all: [],
  panDirection: null,
  panLimit: 200
}

const getters = {
  allPendingTexts: state => state.all,
  acceptedTexts: state => state.all.filter(t => t.status === 'accepted'),
  refusedTexts: state => state.all.filter(t => t.status === 'refused'),
  toAcceptTexts: state => state.all.filter(t => t.status === 'toAccept'),
  toRefuseTexts: state => state.all.filter(t => t.status === 'toRefuse'),
  panDirection: state => state.panDirection,
  panLimit: state => state.panLimit
}

const actions = {
  getAllPendingTexts ({ commit }) {
    pendingTexts.getPendingTexts(pendingTexts => {
      commit(types.RECEIVE_PENDING_TEXTS, { pendingTexts })
    })
  },

  addAcceptedText ({ commit }, id) {
    commit(types.ADD_ACCEPTED_TEXT, { id })
  },

  addRefusedText ({ commit }, id) {
    commit(types.ADD_REFUSED_TEXT, { id })
  },

  addToAcceptText ({ commit }, id) {
    commit(types.ADD_TO_ACCEPT_TEXT, { id })
  },

  addToRefuseText ({ commit }, id) {
    commit(types.ADD_TO_REFUSE_TEXT, { id })
  },

  changePanDirection ({ commit }, direction) {
    commit(types.CHANGE_PAN_DIRECTION, { direction })
  }
}

const mutations = {
  [types.RECEIVE_PENDING_TEXTS] (state, { pendingTexts }) {
    state.all = pendingTexts
  },

  [types.ADD_ACCEPTED_TEXT] (state, { id }) {
    const text = state.all.find(t => t.id === id)
    text.status = 'accepted'
  },

  [types.ADD_REFUSED_TEXT] (state, { id }) {
    const text = state.all.find(t => t.id === id)
    text.status = 'refused'
  },

  [types.ADD_TO_ACCEPT_TEXT] (state, { id }) {
    const text = state.all.find(t => t.id === id)
    text.status = 'toAccept'
  },

  [types.ADD_TO_REFUSE_TEXT] (state, { id }) {
    const text = state.all.find(t => t.id === id)
    text.status = 'toRefuse'
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
