import Vue from 'vue'

export default {
  getPendingTexts (cb, errorCb) {
    Vue.http.get('http://localhost:3003/pending').then(response => {
      cb(response.body.texts)
    }, response => {
      errorCb()
    })
  }
}
