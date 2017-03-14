<template>
  <div id="app">
    <h1>Bookmarks classifier</h1>
    <h2>Naive Bayes classifier</h2>

    <!-- <commit-chart></commit-chart> -->

    <strong>Tags:</strong> {{ bayes.tags }}
    <br>
    <strong>WordsByTags:</strong> {{ bayes.wordsByTags }}
    <br>
    <strong>TextCountByTag:</strong> {{ bayes.textCountByTag }}
    <br>
    <strong>WordsCount:</strong> {{ bayes.wordsCount }}
    <br>

    <button @click='resetTrainning'>Reset trainning</button>
    <small>Usefull if stored data are corrupted</small>


    <h3>Upload backup file</h3>
    <h3>Train</h3>
    <h3>Test</h3>

    <input type='text' placeholder='bookmark title' v-model='title'>
    <button @click='guess'>Classify!</button>

    <!-- <img src="./assets/logo.png"> -->
    <!-- <hello></hello> -->
  </div>
</template>

<script>
import CommitChart from './components/TestBar'
import Hello from './components/Hello'
import Bayes from './bayes'

export default {
  name: 'app',
  data () {
    return {
      title: "JavaScript c'est pas mal",
      bayes: new Bayes()
    }
  },
  created () {
    const trains = [
      { tag: 'ruby', text: 'Please, Ruby devs, join() your paths' },
      { tag: 'ruby', text: 'Augmenting A Ruby on Rails App with Vue.js' },
      { tag: 'ruby', text: 'Rails isn’t trendy anymore. Hooray for Rails! | Ruby Fleebie' },
      { tag: 'ruby', text: 'Incremental Garbage Collection in Ruby 2.2' },
      { tag: 'ruby', text: 'A new way to understand your Rails app’s performance - Weissblog' },
      { tag: 'ruby', text: 'Écrire un jeu en 2d avec Ruby et Gosu - partie 1 - Xavier Nayrac' },
      { tag: 'ruby', text: 'Trends in Ruby - analyzing rubygems stats for 2015' },
      { tag: 'javascript', text: 'Chart.js | Open source HTML5 Charts for your website' },
      { tag: 'javascript', text: 'Getting Started with Webpack: Module Bundling Magic' },
      { tag: 'javascript', text: 'Intro to Webpack' },
      { tag: 'javascript', text: 'Overview of JavaScript ES6 features (a.k.a ECMAScript 6 and ES2015+)' },
      { tag: 'javascript', text: 'Things you should know about JS events' }
    ]

    for (let i = 0; i < trains.length; i++) {
      const tag = trains[i]['tag']
      const text = trains[i]['text']

      this.bayes.train(text, tag)
    }
  },
  components: {
    Hello, CommitChart
  },
  methods: {
    resetTrainning () {
      this.bayes.resetTrainning()
    },
    guess () {
      this.bayes.guess(this.title)
      console.log(this.bayes.winner())
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
