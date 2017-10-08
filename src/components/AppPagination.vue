<template>
</template>

<script>
export default {
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      this.$store.dispatch('getAllPendingTexts')
    }
  }
}
</script>
