<template lang='pug'>
#app
  .container
    h1 Bookmarks classifier
    h2 Naive Bayes classifier

    nav.nav
      button.tab(@click='currentTab = "guessTab"', :class='{ "active": isGuessTab }') Guess
      button.tab(@click='currentTab = "supervisionTab"', :class='{ "active": !isGuessTab }') Supervision

    template(v-if='isGuessTab')
      input(type='text' placeholder='bookmark title' v-model='text' @keyup.enter='guess' autofocus)
      br
      button.btn(@click='guess') CLASSIFY

      label-probability-bar(:chart-data='test', :height='150', :options="{ legend: { display: false } }")
    template(v-else)
      | supervisionTab
</template>

<script>
import LabelProbabilityBar from './components/LabelProbabilityBar'

export default {
  name: 'app',
  data () {
    return {
      currentTab: 'guessTab',
      text: 'Javascript est un bon langage',
      scores: {}
    }
  },
  computed: {
    isGuessTab () {
      return this.currentTab === 'guessTab'
    },
    test () {
      return {
        labels: Object.keys(this.scores),
        datasets: [
          {
            label: 'Probabilities per labels',
            backgroundColor: '#4fc08d',
            data: Object.values(this.scores).map(score => { return score * 100 })
          }
        ]
      }
    }
  },
  created () {
    // const trainersResource = this.$resource('http://localhost:3003/solve{/text}')
    //
    // trainersResource.get().then(response => {
    //   this.trainers = response.body.trainers
    //   this.train()
    // })
  },
  methods: {
    guess () {
      this.$http.post('http://localhost:3003/guess', { text: this.text }).then(response => {
        this.scores = JSON.parse(response.bodyText)['scores']
      }, response => {
        console.log(response.status)
      })
    }
  },
  components: {
    LabelProbabilityBar
  }
}
</script>

<style>
body {
  font-size: 14px;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #35495e;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin-top: 4em;
  text-align: center;
}

.container {
  margin: 0 auto;
  width: 60%;
}

.container-fluid {
  width: 100%;
}

h1 {
  color: #2c3e50;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-size: 3.2em;
  font-weight: 300;
  margin: 0;
}

input[type=text] {
  border-radius: 25px;
  border: 1px solid #e3e3e3;
  color: #2c3e50;
  font-size: 1rem;
  outline: none;
  padding: 13px 18px;
  transition: border-color 0.2s ease;
  width: 300px;
}

input[type=text]:focus {
  border-color: #4fc08d;
}

button {
  cursor: pointer;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: .1em;
  outline: none;
  transition: all 0.15s ease;
}

.btn {
  background-color: #4fc08d;
  border-radius: 2em;
  border: 1px solid #4fc08d;
  color: #fff;
  margin: 1em 0;
  padding: 0.75em 2em;
}

.nav {
  margin: 2em 0;
}

.tab {
  background: none;
  border-bottom: 3px solid #fff;
  border: none;
  margin: .5em 1em;
  padding: 0 0 .3em;
}

.tab.active {
  border-bottom-color: #4fc08d;
}

#bar-chart {
  height: 200px;
}
</style>
