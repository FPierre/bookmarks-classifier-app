<template>
  <div class='tabs is-centered'>
    <ul>
      <li class='is-active' @click='currentTab = "pendingTab"'><a>Texts</a></li>
      <li @click='currentTab = "guessTab"'><a>Guess</a></li>
      <li @click='currentTab = "supervisionTab"'><a>Supersivion</a></li>
    </ul>
  </div>

    <!-- <nav class='tab' :class='{ "fixed": scrollY >= 135 }'>
      <button class='tab' :class='{ "active": isPendingTab }' @click='currentTab = "pendingTab"'>
        Pending texts ({{ pendingTextsCount }})
      </button>
      <button class='tab' :class='{ "active": isGuessTab }' @click='currentTab = "guessTab"'>
        Guess
      </button>
      <button class='tab' :class='{ "active": isSupervisionTab }' @click='currentTab = "supervisionTab"'>
        Supervision
      </button>
    </nav> -->
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
