<template lang='pug'>
.pending-text-component
  v-touch(@panleft='refuteClassification', @panend='endRefuteClassification')
    .pending-text(:style='{ marginRight: marginRight }')
      span.pending-text-title {{ data.text }}
      span.pending-text-tag {{ data.tag }}
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      marginRight: '0px'
    }
  },
  methods: {
    startRefuteClassification (e) {
      // console.log('startRefuteClassification')
      //
      // const box = document.querySelector(e.target.localName).closest('.pending-text')
      //
      // // Sometime it's null
      // if (box) {
      //   console.log('box')
      //   this.originalMarginRight = 0
      // }
    },
    refuteClassification (e) {
      // console.log('refuteClassification')
      // console.log(e)

      const box = document.querySelector(e.target.localName).closest('.pending-text')
      // console.log(box)

      // Sometime it's null
      if (box) {
        this.marginRight = `${e.distance}px`
        // box.style.marginRight = `${e.distance}px`
      }
    },
    endRefuteClassification (e) {
      console.log('endRefuteClassification')

      const box = document.querySelector(e.target.localName).closest('.pending-text')

      if (box) {
        // box.style.marginRight = '0px'
        this.marginRight = '0px'
      }
    }
  }
}
</script>

<style scoped>
.pending-text-component {
  background-color: red;
  border: 1px solid #e4e4e4;
  border-bottom: none;
}

.pending-text {
  background-color: #fff;
  padding: 1.2rem;
}

.pending-text-component:last-child {
  border-bottom: 1px solid #e4e4e4;
}

.pending-text-title {
  display: block;
  font-weight: bold;
}

.pending-text-tag {
  display: block;
}
</style>
