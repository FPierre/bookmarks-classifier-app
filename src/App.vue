<template>
  <div id='app'>
    <header class='header'>
      <div>
        <h1>Bookmarks classifier</h1>
        <h2>Naive Bayes classifier feeded by IT articles</h2>
      </div>

      <nav class='tab' :class='{ "fixed": scrollY >= 135 }'>
        <button class='tab' :class='{ "active": isPendingTab }' @click='currentTab = "pendingTab"'>
          Pending texts ({{ allPendingTexts.length }})
        </button>
        <button class='tab' :class='{ "active": isGuessTab }' @click='currentTab = "guessTab"'>
          Guess
        </button>
        <button class='tab' :class='{ "active": isSupervisionTab }' @click='currentTab = "supervisionTab"'>
          Supervision
        </button>
      </nav>
    </header>

    <div>
      <div class='tab-content'>
        <template v-if='isGuessTab'>
          <div>
            <input type='text' placeholder='bookmark title' v-model='text' @keyup.enter='guess' autofocus>
            <br>
            <button class='btn' @click='guess'>CLASSIFY</button>

            <label-probability-bar :chart-data='test' :height='150' :options="{ legend: { display: false } }"></label-probability-bar>
          </div>
        </template>

        <template v-else-if='isPendingTab'>
          <div>
            <template v-if='acceptedTexts.length > 0'>
              <div class='actions'>
                <button class='btn'>
                  Accept {{ acceptedTexts.length }} texts
                </button>
              </div>
            </template>

            <template v-else-if='refusedTexts.length > 0'>
              <div class='actions'>
                <button class='btn'>
                  Delete {{ refusedTexts.length }} texts
                </button>
              </div>
            </template>

            <pending-text v-for='text in allPendingTexts' :data='text' :key='text.id'></pending-text>
          </div>
        </template>

        <template v-else-if='isSupervisionTab'>
          <div>
            supervisionTab
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PendingText from '@/components/PendingText'
import LabelProbabilityBar from '@/components/LabelProbabilityBar'

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

<style lang='scss'>
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/grid/columns';

body {
  background-color: #eee;
  color: #2c3e50;
  font-size: 14px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
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
  margin-top: -4rem;
  position: absolute;
}

#bar-chart {
  height: 200px;
}
</style>
