<template>
  <div class='pending-text-component'>
    <div class='accept'>
      Accept
      <icon name='check' scale='2'></icon>
    </div>

    <div class='refuse'>
      Refuse
      <icon name='trash-o' scale='2'></icon>
    </div>

    <v-touch @panleft='refuse' @panright='accept' @panend='panEnd' @pancancel='panEnd'>
      <div class='pending-text' :class='statusClasses' :style='{ marginRight, marginLeft }'>
        <div class='text-informations'>
          <span class='pending-text-title'>{{ pending.text }}</span>
          <span class='pending-text-tag'>{{ pending.tag }}</span>
        </div>

        <icon name='check' v-if='isToAccept'></icon>
        <icon name='trash-o' v-if='isToRefuse'></icon>

        <button class='undo' v-if='pending.status' @click='undo'>
          <icon name='undo'></icon>
        </button>
      </div>
    </v-touch>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import 'vue-awesome/icons/check'
import 'vue-awesome/icons/trash-o'
import 'vue-awesome/icons/undo'
const Icon = () => import('vue-awesome/components/Icon')

export default {
  props: ['pending'],
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
    isAccepted () {
      return this.pending.status === 'accepted'
    },
    isRefused () {
      return this.pending.status === 'refused'
    },
    isToAccept () {
      return this.pending.status === 'toAccept'
    },
    isToRefuse () {
      return this.pending.status === 'toRefuse'
    },
    isLeftDirection () {
      return this.panDirection === 'left'
    },
    isRightDirection () {
      return this.panDirection === 'right'
    },
    statusClasses () {
      return {
        'accepted': this.isAccepted,
        'refused': this.isRefused,
        'to-accept': this.isToAccept,
        'to-refuse': this.isToRefuse
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
      if (this.isLeftDirection || this.isAccepted || this.isRefused) {
        return
      }

      this.resetMarginLeft()

      if (e.distance <= this.panLimit) {
        this.marginRight = `${e.distance}px`
        this.changePanDirection('right')
      } else {
        // Sometimes it exceeds the limit
        this.marginRight = `${this.panLimit}px`
        this.addRefusedText(this.pending.id)
        // Avoids border effect when accepted (padding reduce height of box, may hover other boxes)
        this.changePanDirection(null)
        this.resetMarginRight()
      }
    },
    accept (e) {
      if (this.isRightDirection || this.isAccepted || this.isRefused) {
        return
      }

      this.resetMarginRight()

      if (e.distance <= this.panLimit) {
        this.marginLeft = `${e.distance}px`
        this.changePanDirection('left')
      } else {
        // Sometimes it exceeds the limit
        this.marginLeft = `${this.panLimit}px`
        this.addAcceptedText(this.pending.id)
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
