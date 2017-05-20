<template lang='pug'>
#app
  header.header
    .container
      h1 Bookmarks classifier
      h2 Naive Bayes classifier feeded by bookmarked articles

    .container-fluid
      nav.tabs(:class='{ "fixed": scrollY >= 150 }')
        button.tab(@click='currentTab = "pendingTab"', :class='{ "active": isPendingTab }') Pending texts ({{ pendingTexts.length }})
        button.tab(@click='currentTab = "guessTab"', :class='{ "active": isGuessTab }') Guess
        button.tab(@click='currentTab = "supervisionTab"', :class='{ "active": isSupervisionTab }') Supervision

  .container-fluid
    .tab-content
      template(v-if='isGuessTab')
        .container
          input(type='text' placeholder='bookmark title' v-model='text' @keyup.enter='guess' autofocus)
          br
          button.btn(@click='guess') CLASSIFY

          label-probability-bar(:chart-data='test', :height='150', :options="{ legend: { display: false } }")

      template(v-else-if='isPendingTab')
        .container
          //- pending-text-list
          pending-text(v-for='text in pendingTexts', :data='text', :key='text')

      template(v-else-if='isSupervisionTab')
        .container
          | supervisionTab
</template>

<script>
import { mapGetters } from 'vuex'
import PendingText from './components/PendingText'
// import PendingTextList from './components/PendingTextList'
import LabelProbabilityBar from './components/LabelProbabilityBar'

export default {
  name: 'app',
  data () {
    return {
      currentTab: 'pendingTab',
      // pendingTexts: {},
      text: 'Javascript est un bon langage',
      scores: {},
      scrollY: null
    }
  },
  computed: {
    ...mapGetters({
      pendingTexts: 'allPendingTexts'
    }),
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
    window.addEventListener('scroll', this.handleScroll)

    this.$store.dispatch('getAllPendingTexts')

    // const trainersResource = this.$resource('http://localhost:3003/solve{/text}')
    //
    // trainersResource.get().then(response => {
    //   this.trainers = response.body.trainers
    //   this.train()
    // })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    guess () {
      this.$http.post('http://localhost:3003/guess', { text: this.text }).then(response => {
        this.scores = JSON.parse(response.bodyText)['scores']
      }, response => {
        console.log(response.status)
      })
    },
    handleScroll () {
      this.scrollY = window.scrollY
    }
  },
  components: {
    // PendingTextList,
    PendingText,
    LabelProbabilityBar
  }
}
</script>

<style>
body {
  /*color: #35495e;*/
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: #eee;
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

.header {
  background-color: #fff;
  padding-top: .1rem;
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
  background-color: #fff;
  padding: 4em 0 0;
  text-align: center;
  transition: all .3s ease-in;
  width: 100%;
}

.tabs.fixed {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .1), 0 1px 10px 0 rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .3);
  left: 0;
  position: fixed;
  top: 0;
  z-index: 2;
}

.tab {
  background: none;
  border: none;
  border-bottom: 4px solid transparent;
  margin: 0 1em;
  padding: 0 0 .6em;
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
</style>
