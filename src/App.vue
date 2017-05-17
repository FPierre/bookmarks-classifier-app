<template lang='pug'>
#app
  .container
    h1 Bookmarks classifier
    h2 Naive Bayes classifier feeded by bookmarked articles

    nav.tabs
      button.tab(@click='currentTab = "guessTab"', :class='{ "active": isGuessTab }') Guess
      button.tab(@click='currentTab = "pendingTab"', :class='{ "active": isPendingTab }') Pending texts
      button.tab(@click='currentTab = "supervisionTab"', :class='{ "active": isSupervisionTab }') Supervision

  .container-fluid
    .tab-content
      template(v-if='isGuessTab')
        input(type='text' placeholder='bookmark title' v-model='text' @keyup.enter='guess' autofocus)
        br
        button.btn(@click='guess') CLASSIFY

        label-probability-bar(:chart-data='test', :height='150', :options="{ legend: { display: false } }")

      template(v-else-if='isPendingTab')
        .container
          .pending-text(v-for='text in pendingTexts')
            span.pending-text-title {{ text.text }}
            span.pending-text-tag {{ text.tag }}

      template(v-else-if='isSupervisionTab')
        | supervisionTab
</template>

<script>
import LabelProbabilityBar from './components/LabelProbabilityBar'

export default {
  name: 'app',
  data () {
    return {
      currentTab: 'guessTab',
      pendingTexts: {},
      text: 'Javascript est un bon langage',
      scores: {}
    }
  },
  computed: {
    isGuessTab () {
      return this.currentTab === 'guessTab'
    },
    isPendingTab () {
      return this.currentTab === 'pendingTab'
    },
    isSupervisionTab () {
      return this.currentTab === 'supervisionTab'
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
    this.$http.get('http://localhost:3003/pending').then(response => {
      this.pendingTexts = response.body.texts
    }, response => {
      // error callback
    })

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
  /*color: #35495e;*/
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  color: #2c3e50;
  font-size: 14px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
}

#app {
}

.container {
  margin: 0 auto;
  width: 60%;
}

.container-fluid {
  width: 100%;
}

h1 {
  font-size: 3.2em;
  font-weight: 300;
  text-align: center;
}

h2 {
  text-align: center;
}

input[type=text] {
  border-radius: 25px;
  border: 1px solid #e3e3e3;
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

.tabs {
  margin: 4em 0;
  text-align: center;
}

.tab {
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  margin: .5em 1em;
  padding: 0 0 .3em;
}

.tab.active {
  border-bottom-color: #4fc08d;
}

.tab-content {
  background-color: #eee;
  padding: 4rem 0;
}

#bar-chart {
  height: 200px;
}

.pending-text {
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-bottom: none;
  padding: 1.2rem;
}

.pending-text:last-child {
  border-bottom: 1px solid #e4e4e4;
}

/*.pending-text:hover {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .3);
}*/

.pending-text-title {
  display: block;
  font-weight: bold;
}

.pending-text-tag {
  display: block;
}
</style>
