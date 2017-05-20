<template lang='pug'>
.pending-text-component
  .accept
    | Accept

  .refuse
    | Refuse

  v-touch(@panleft='refuse', @panright='accept', @panend='panEnd', @pancancel='panEnd')
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
      panLimit: 200,
      panDirection: null
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

      if (this.panDirection === 'left') {
        return
      }

      this.resetMarginLeft()

      if (e.distance <= this.panLimit) {
        this.marginRight = `${e.distance}px`
      } else {
        this.marginRight = `${this.panLimit}px`
        console.log('>= this.panLimit')
      }

      this.panDirection = 'right'
    },
    accept (e) {
      // console.log('accept')
      // const box = document.querySelector(e.target.localName).closest('.pending-text')

      if (this.panDirection === 'right') {
        return
      }

      this.resetMarginRight()

      if (e.distance <= this.panLimit) {
        this.marginLeft = `${e.distance}px`
      } else {
        this.marginLeft = `${this.panLimit}px`
        console.log('>= this.panLimit')
      }

      this.panDirection = 'left'
    },
    panEnd (e) {
      // console.log('panEnd')

      this.resetMarginRight()
      this.resetMarginLeft()
      this.panDirection = null
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
  color: #fff;
  height: 100%;
  left: 0;
  position: absolute;
  width: 200px;
  z-index: -1;
}

.refuse {
  background-color: #ff6666;
  color: #fff;
  height: 100%;
  position: absolute;
  right: 0;
  width: 200px;
  z-index: -1;
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
