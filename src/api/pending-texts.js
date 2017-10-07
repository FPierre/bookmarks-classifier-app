import Vue from 'vue'

export default {
  getPendingTexts (cb, errorCb) {
    Vue.http.get('http://localhost:3003/pending').then(response => {
      // TODO: add status on back side?
      const pendingTexts = response.body.texts.map(t => {
        t.id = `${t.tag}-${t.text}`
        t.status = undefined

        return t
      })

      cb(pendingTexts)
    }, err => {
      errorCb(err)
    })
  }
}
