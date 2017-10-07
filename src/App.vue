<template>
  <div id='app'>
    <app-nav :pending-texts-count='allPendingTexts.length'></app-nav>

    <div class='container'>
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
import AppNav from '@/components/AppNav'
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
    AppNav,
    PendingText,
    LabelProbabilityBar
  }
}
</script>

<style lang='scss'>
@import '~@/assets/stylesheets/bulma-override';

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

.tab-content {
  background-color: #eee;
  padding: 4rem 0 4rem;
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
