<template lang='pug'>
#app
  header.header
    nav.tabs(:class='{ "fixed": scrollY >= 135 }')
      button.tab(@click='currentTab = "pendingTab"', :class='{ "active": isPendingTab }') Pending texts ({{ allPendingTexts.length }})
      button.tab(@click='currentTab = "guessTab"', :class='{ "active": isGuessTab }') Guess
      button.tab(@click='currentTab = "supervisionTab"', :class='{ "active": isSupervisionTab }') Supervision

    .container
      h1 Bookmarks classifier
      h2 Naive Bayes classifier feeded by bookmarked articles

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
          template(v-if='acceptedTexts.length > 0')
            .actions
              button.btn Accept {{ acceptedTexts.length }} texts
          template(v-else-if='refusedTexts.length > 0')
            .actions
              button.btn Delete {{ refusedTexts.length }} texts

          pending-text(v-for='text in allPendingTexts', :data='text', :key='text')

      template(v-else-if='isSupervisionTab')
        .container
          | supervisionTab
</template>

<script>
import { mapGetters } from 'vuex'
import PendingText from './components/PendingText'
import LabelProbabilityBar from './components/LabelProbabilityBar'

export default {
  name: 'app',
  data () {
    return {
      currentTab: 'pendingTab',
      text: 'Javascript est un bon langage',
      scores: {},
      scrollY: null
    }
  },
  computed: {
    ...mapGetters([
      'allPendingTexts',
      'acceptedTexts',
      'refusedTexts',
      'panDirection'
    ]),
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

.header {
  background-color: #fff;
}

h1 {
  font-size: 3.2em;
  font-weight: 300;
  margin-bottom: 0;
  margin-top: 0;
  padding: 2rem 0 .5rem;
  text-align: center;
}

h2 {
  text-align: center;
}

.tabs {
  background-color: #fff;
  padding: 4em 0 0;
  position: absolute;
  text-align: center;
  top: 9.4em;
  width: 100%;
}

.tabs.fixed {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .1), 0 1px 10px 0 rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .3);
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
  padding: 9rem 0 4rem;
  transition: all .3s ease-in;
}

.actions {
  /*background-color: blue;*/
  /*margin-bottom: 1rem;*/
  position: absolute;
  /*width: 100%;*/
  /*height: 100px;*/
  /*left: 0;*/
  margin-top: -4rem;
}

#bar-chart {
  height: 200px;
}
</style>
