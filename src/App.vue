<template>
  <div id='app'>
    <div class='container'>
      <h1>Bookmarks classifier</h1>
      <h2>Naive Bayes classifier</h2>

      <h3>Test a classification</h3>

      <input type='text' placeholder='bookmark title' v-model='title' @keyup.enter='guess' autofocus>
      <br>
      <button class='btn' @click='guess'>CLASSIFY</button>
      <div v-if='winner'>{{ winnerSentence }}</div>

      <nav class='nav'>
        <button class='tab' @click='currentTab = "simpleMode"' :class='{ "active": currentTab == "simpleMode" }'>Simple</button>
        <button class='tab' @click='currentTab = "fullMode"' :class='{ "active": currentTab == "fullMode" }'>Full</button>
      </nav>

      <template v-if='currentTab == "simpleMode"'>
      </template>
      <template v-else>
        <h3>Words distribution</h3>

        <texts-by-tag-chart :height='80' :texts-by-tag='bayes.textCountByTag'></texts-by-tag-chart>
        <!-- <tags-chart :height='100' :tags='bayes.wordsByTags'></tags-chart> -->
        <!-- <commit-chart :height='100'></commit-chart> -->

        <pre>{{ bayes.wordsByTags }}</pre>
        <pre>{{ bayes.tags }}</pre>
        <pre>{{ bayes.textCountByTag }}</pre>
        <pre>{{ bayes.wordsCount }}</pre>
      </template>
    </div>

    <div class='explanations'>
      <div class='container-fluid'>
        <div class='container'>
          <h3>How it's works?</h3>
          <h3>Why an API is needed?</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextsByTagChart from './components/TextsByTagChart'
// import TagsChart from './components/TagsChart'
import CommitChart from './components/TestBar'
import Bayes from './Bayes'

export default {
  name: 'app',
  data () {
    return {
      currentTab: 'simpleMode',
      title: null,
      bayes: new Bayes(),
      winner: null,
      trainers: []
    }
  },
  computed: {
    winnerSentence () {
      return `This title probably deals with ${this.winner['tag']} (${this.winner['score']})`
    }
  },
  created () {
    const trainersResource = this.$resource('http://localhost:3003/trainers{/id}')
    trainersResource.get().then(response => {
      this.trainers = response.body.trainers
      this.train()
    })
  },
  components: {
    TextsByTagChart,
    // TagsChart,
    CommitChart
  },
  methods: {
    train () {
      for (let i = 0; i < this.trainers.length; i++) {
        const tag = this.trainers[i]['tag']
        const text = this.trainers[i]['text']

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
  margin-top: 4em;
}

.container {
  width: 50%;
  margin: 0 auto;
}

.container-fluid {
  width: 100%;
}

h1 {
  margin: 0;
  font-weight: 300;
  font-size: 3.2em;
  color: #2c3e50;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
}

h3 {

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
  font-size: 1.05em;
  font-weight: 600;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: .1em;
  transition: all 0.15s ease;
  outline: none;
}

.btn {
  margin: 1em 0;
  padding: 0.75em 2em;
  color: #fff;
  background-color: #4fc08d;
  border: 1px solid #4fc08d;
  border-radius: 2em;
}

.nav {
  margin: 2em 0;
}

.tab {
  margin: .5em 1em;
  padding: 0 0 .3em;
  background: none;
  border: none;
  border-bottom: 3px solid #fff;
}

.tab.active {
  border-bottom-color: #4fc08d;
}

.explanations {
  padding: 45px 40px;
  color: #999;
  background-color: #f6f6f6;
}
</style>
