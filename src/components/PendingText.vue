<template lang='pug'>
.pending-text-component
  .accept
    | Accept
    icon(name='check', scale='2')

  .refuse
    | Refuse
    icon(name='trash-o', scale='2')

  v-touch(@panleft='refuse', @panright='accept', @panend='panEnd', @pancancel='panEnd')
    .pending-text(:class='pendingTextClass', :style='{ marginRight: marginRight, marginLeft: marginLeft }', @mouseover='hover')
      .text-informations
        span.pending-text-title {{ data.text }}
        span.pending-text-tag {{ data.tag }}

      icon(name='check', v-if='data.status === "toAccept"')
      icon(name='trash-o', v-if='data.status === "toRefuse"')

      button.undo(v-if='data.status', @click='undo')
        icon(name='undo')
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/trash-o'
import 'vue-awesome/icons/undo'
import Icon from 'vue-awesome/components/Icon'

export default {
  props: ['data'],
  data () {
    return {
      marginRight: '0px',
      marginLeft: '0px'
    }
  },
  computed: {
    ...mapGetters([
      'panDirection',
      'panLimit'
    ]),
    pendingTextClass () {
      return {
        'accepted': this.data.status === 'accepted',
        'refused': this.data.status === 'refused',
        'to-accept': this.data.status === 'toAccept',
        'to-refuse': this.data.status === 'toRefuse'
      }
    }
  },
  methods: {
    ...mapActions([
      'changePanDirection',
      'addAcceptedText',
      'addRefusedText',
      'addToAcceptText',
      'addToRefuseText'
    ]),
    resetMarginLeft () {
      this.marginLeft = '0px'
    },
    resetMarginRight () {
      this.marginRight = '0px'
    },
    refuse (e) {
      if (this.panDirection === 'left' || this.data.status === 'accepted' || this.data.status === 'refused') {
        return
      }

      this.resetMarginLeft()

      if (e.distance <= this.panLimit) {
        this.marginRight = `${e.distance}px`
        this.changePanDirection('right')
      } else {
        // Sometimes it exceeds the limit
        this.marginRight = `${this.panLimit}px`
        this.addRefusedText(this.data.id)
        // Avoids border effect when accepted (padding reduce height of box, may hover other boxes)
        this.changePanDirection(null)
        this.resetMarginRight()
      }
    },
    accept (e) {
      if (this.panDirection === 'left' || this.data.status === 'refused' || this.data.status === 'accepted') {
        return
      }

      this.resetMarginRight()

      if (e.distance <= this.panLimit) {
        this.marginLeft = `${e.distance}px`
        this.changePanDirection('left')
      } else {
        // Sometimes it exceeds the limit
        this.marginLeft = `${this.panLimit}px`
        this.addAcceptedText(this.data.id)
        // Avoids border effect when accepted (padding reduce height of box, may hover other boxes)
        this.changePanDirection(null)
        this.resetMarginLeft()
      }
    },
    panEnd (e) {
      this.resetMarginRight()
      this.resetMarginLeft()
      this.changePanDirection(null)
    },
    hover () {
      if (this.panDirection === null) {
        return
      }

      if (this.panDirection === 'right' && this.data.status !== 'toRefuse') {
        this.addToRefuseText(this.data.id)
      } else if (this.panDirection === 'left' && this.data.status !== 'toAccept') {
        this.addToAcceptText(this.data.id)
      }
    },
    undo () {
      console.log('undo')
    }
  },
  components: {
    Icon
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
  display: flex;
  transition: padding .5s ease;
}

.pending-text.accepted {
  background-color: #4fc08d;
  color: #fff;
  padding: .5rem 1.1rem;
}

.pending-text.refused {
  background-color: #ff6666;
  color: #fff;
  padding: .5rem 1.1rem;
}

.pending-text.accepted .pending-text-tag,
.pending-text.refused .pending-text-tag {
  display: none;
}

.pending-text.to-accept {
}

.pending-text.to-refuse {
}

.text-informations {
  flex-grow: 1;
}

.pending-text-title {
  display: block;
  font-weight: bold;
}

.pending-text-tag {
  display: block;
}

.undo {
  background: none;
  border: none;
  color: inherit;
}
</style>
