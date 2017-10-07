<template>
  <nav class='nav'>
    <nav class='tab' :class='{ "fixed": scrollY >= 135 }'>
      <button class='tab' :class='{ "active": isPendingTab }' @click='currentTab = "pendingTab"'>
        Pending texts ({{ pendingTextsCount }})
      </button>
      <button class='tab' :class='{ "active": isGuessTab }' @click='currentTab = "guessTab"'>
        Guess
      </button>
      <button class='tab' :class='{ "active": isSupervisionTab }' @click='currentTab = "supervisionTab"'>
        Supervision
      </button>
    </nav>
  </nav>
</template>

<script>
export default {
  props: ['pendingTextsCount'],
  data () {
    return {
      currentTab: 'pendingTab',
      scrollY: null
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
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.scrollY = window.scrollY
    }
  }
}
</script>

<style scoped>
.nav {
  background-color: #fff;
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
</style>
