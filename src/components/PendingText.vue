<template lang='pug'>
.pending-text-component
  .accept
    | Accept

  .refuse
    | Refuse

  v-touch(@panleft='refuse', @panright='accept', @panend='panEnd', @pancancel='panEnd')
    .pending-text(:class='pendingTextClass', :style='{ marginRight: marginRight, marginLeft: marginLeft }', @mouseover='hover')
      span.pending-text-title {{ data.text }}
      span.pending-text-tag {{ data.tag }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['data'],
  data () {
    return {
      marginRight: '0px',
      marginLeft: '0px',
      panLimit: 200
    }
  },
  computed: {
    ...mapGetters([
      'panDirection'
    ]),
    pendingTextClass () {
      return {
        'to-accept': this.data.status === 'accepted',
        'to-refuse': this.data.status === 'refused'
      }
    }
  },
  methods: {
    ...mapActions([
      'addAcceptedText',
      'addRefusedText'
    ]),
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
    panEnd (e) {
      // console.log('panEnd')

      this.resetMarginRight()
      this.resetMarginLeft()
      this.$store.dispatch('changePanDirection', null)
    },
    hover () {
      if (this.panDirection === null) {
        return
      }

      if (this.panDirection === 'right' && this.data.status !== 'refused') {
        this.addRefusedText(this.data.id)
      } else if (this.panDirection === 'left' && this.data.status !== 'accepted') {
        this.addAcceptedText(this.data.id)
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
  padding: 1.1rem;
}

.pending-text.to-accept {
  /*background-color: rgba(79, 191, 141, .2);*/
  background-color: #4fc08d;
}

.pending-text.to-refuse {
  /*background-color: rgba(255, 102, 102, .2);*/
  background-color: #ff6666;
}

.pending-text-title {
  display: block;
  font-weight: bold;
}

.pending-text-tag {
  display: block;
}
</style>
