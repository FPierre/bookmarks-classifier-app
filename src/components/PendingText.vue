<template lang='pug'>
.pending-text-component
  .accept
    | Accept

  .refuse
    | Refuse

  v-touch(@panleft='refuse', @panright='accept', @panend='panEnd')
    .pending-text(:style='{ marginRight: marginRight, marginLeft: marginLeft }')
      span.pending-text-title {{ data.text }}
      span.pending-text-tag {{ data.tag }}
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      marginRight: '0px',
      marginLeft: '0px',
      panLimit: 200
    }
  },
  methods: {
    resetMarginLeft () {
      this.marginLeft = '0px'
    },
    resetMarginRight () {
      this.marginRight = '0px'
    },
    refuse (e) {
      // console.log('refuse')
      // console.log(e)

      this.resetMarginLeft()

      if (e.distance < this.panLimit) {
        this.marginRight = `${e.distance}px`
      } else {
        console.log('>= this.panLimit')
      }
    },
    accept (e) {
      // console.log('accept')
      // console.log(e)
      // const box = document.querySelector(e.target.localName).closest('.pending-text')

      this.resetMarginRight()

      if (e.distance < this.panLimit) {
        this.marginLeft = `${e.distance}px`
      } else {
        console.log('>= this.panLimit')
      }
    },
    panEnd (e) {
      console.log('panEnd')

      this.resetMarginRight()
      this.resetMarginLeft()
    }
  }
}
</script>

<style scoped>
.pending-text-component {
  position: relative;
  z-index: 1;
}

.accept {
  background-color: #4fc08d;
  height: 100%;
  left: 0;
  position: absolute;
  padding-left: 2.5rem;
  width: 200px;
  z-index: -1;
  font-size: 1.2rem;
  color: #fff;
}

.refuse {
  background-color: red;
  height: 100%;
  position: absolute;
  right: 0;
  padding-right: 2.5rem;
  width: 200px;
  z-index: -1;
  font-size: 1.2rem;
  color: #fff;
}

.pending-text-component:last-child {
  border-bottom: 1px solid #e4e4e4;
}

.pending-text {
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-bottom: none;
  padding: 1.2rem;
}

.pending-text-title {
  display: block;
  font-weight: bold;
}

.pending-text-tag {
  display: block;
}
</style>
