<template lang='pug'>
.pending-text-component(:class='{ "to-accept": toAccept, "to-refuse": toRefuse }')
  .accept
    | Accept

  .refuse
    | Refuse

  v-touch(@panleft='refuse', @panright='accept', @pandown='panDown', @panend='panEnd', @pancancel='panEnd')
    //- .pending-text(:style='{ marginRight: marginRight, marginLeft: marginLeft }', @hover='hover', @mouseover='hover', @onmousedown='hover', @onmousemove='hover')
    .pending-text(:style='{ marginRight: marginRight, marginLeft: marginLeft }', @mouseover='hover')
      span.pending-text-title {{ data.text }}
      span.pending-text-tag {{ data.tag }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['data'],
  data () {
    return {
      marginRight: '0px',
      marginLeft: '0px',
      panLimit: 200,
      toAccept: false,
      toRefuse: false
    }
  },
  computed: {
    ...mapGetters([
      'panDirection'
    ])
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
      }

      this.$store.dispatch('changePanDirection', 'right')
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
      }

      this.$store.dispatch('changePanDirection', 'left')
    },
    panDown (e) {
      // console.log('panDown')

      // const box = document.querySelector(e.target).closest('.pending-text')
      // const box = document.querySelector(e.target.localName).closest('.pending-text')
      // console.log(box)

      // // Refuse
      // if (this.panDirection === 'right') {
      //   console.log('refuse')
      // // Accept
      // } else if (this.panDirection === 'left') {
      //   console.log('accept')
      // }
    },
    panEnd (e) {
      // console.log('panEnd')

      this.resetMarginRight()
      this.resetMarginLeft()
      this.$store.dispatch('changePanDirection', null)
    },
    hover () {
      // console.log('hover')

      // Refuse
      if (this.panDirection === 'right') {
        this.toRefuse = true
      // Accept
      } else if (this.panDirection === 'left') {
        this.toAccept = true
      }
    }
  }
}
</script>

<style scoped>
.pending-text-component {
  position: relative;
  z-index: 1;
}

.pending-text-component.toAccept {
  background-color: green;
}

.pending-text-component.toRefuse {
  background-color: red;
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
