<template lang='pug'>
#app
  .container
    h1 Bookmarks classifier
    h2 Naive Bayes classifier

    input(type='text' placeholder='bookmark title' v-model='title' @keyup.enter='guess' autofocus)
    br
    button.btn(@click='guess') CLASSIFY
    div(v-if='winner')
    //- nav.nav
    //-   button.tab(@click='currentTab = "simpleMode"' :class='{ "active": currentTab == "simpleMode" }') Simple
    //-   button.tab(@click='currentTab = "fullMode"' :class='{ "active": currentTab == "fullMode" }') Full
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: null
    }
  },
  created () {
    // const trainersResource = this.$resource('http://localhost:3003/solve{/text}')
    //
    // trainersResource.get().then(response => {
    //   this.trainers = response.body.trainers
    //   this.train()
    // })
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
</style>
