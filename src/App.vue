<template>
  <div id='app'>
    <h1>Bookmarks classifier</h1>
    <h2>Naive Bayes classifier</h2>

    <h3>Test a classification</h3>

    <input type='text' placeholder='bookmark title' v-model='title' @keyup.enter='guess' autofocus>
    <br>
    <button @click='guess'>CLASSIFY</button>
    <div v-if='winner'>{{ winnerSentence }}</div>

    <!-- <commit-chart></commit-chart> -->

    <h3>How it's works?</h3>

    <p><a href='https://en.wikipedia.org/wiki/Naive_Bayes_classifier'>Naive Bayes classifier</a> is a simple
    This project is heavely inspired by this illuminating article.</p>

    <!-- {{ bayes.wordsByTags }} -->
    <!-- {{ bayes.tags }}
    {{ bayes.textCountByTag }}
    {{ bayes.wordsCount }} -->

  </div>
</template>
<script>

import CommitChart from './components/TestBar'
import Trainers from './assets/trainers/trainers'
import Bayes from './bayes'

export default {
  name: 'app',
  data () {
    return {
      title: null,
      bayes: new Bayes(),
      winner: null
    }
  },
  computed: {
    winnerSentence () {
      return `This title probably deals with ${this.winner['tag']} (${this.winner['score']})`
    }
  },
  created () {
    // console.log(Trainers)

    this.train()
  },
  components: {
    CommitChart
  },
  methods: {
    train () {
      for (let i = 0; i < Trainers.length; i++) {
        const tag = Trainers[i]['tag']
        const text = Trainers[i]['text']

        this.bayes.train(text, tag)
      }
    },
    guess () {
      this.bayes.guess(this.title)
      this.winner = this.bayes.winner()
    },
    resetTraining () {
      this.bayes.resetTraining()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #35495e;
  margin-top: 60px;
}

h1 {
  margin: 0;
  font-weight: 300;
  font-size: 3.2em;
  color: #2c3e50;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}

input[type=text] {
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  color: #2c3e50;
  border: 1px solid #e3e3e3;
  border-radius: 15px;
  outline: none;
  transition: border-color 0.2s ease;
}

input[type=text]:focus {
  border-color: #4fc08d;
}

button {
  display: inline-block;
  margin: 1em 0;
  padding: 0.75em 2em;
  font-size: 1.05em;
  font-weight: 600;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: 0.1em;
  color: #fff;
  background-color: #4fc08d;
  border: 1px solid #4fc08d;
  border-radius: 2em;
  box-sizing: border-box;
  transition: all 0.15s ease;
  outline: none;
}
</style>
