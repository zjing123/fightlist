<template>
  <div>
  <!-- <search
  @result-click="resultClick"
  @on-change="getResult"
  :results="results"
  v-model="value"
  position="fixed"
  auto-scroll-to-top top="46px"
  @on-focus="onFocus"
  @on-cancel="onCancel"
  @on-submit="onSubmit"
  :autoFixed="false"
  ref="search"></search> -->
  <div>
    <group>
      <cell :title="$t('Single player game')" is-link link="/game/1">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png"/>
      </cell>
      <cell :title="$t('Multiplayer war')" is-link link="/game/2">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png"/>
      </cell>
      <!-- <cell title="多人游戏" is-link link="/sticky">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png"/>
      </cell> -->
    </group>
  </div>
</div>
</template>

<i18n>
</i18n>

<script>
import { Search, Group, Cell, XButton, Sticky } from 'vux'
export default {
  components: {
    Search,
    Group,
    Cell,
    XButton,
    Sticky
  },
  methods: {
    setFocus () {
      console.log('on focus')
    },
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      console.log('on-change', val)
    },
    onSubmit () {
      console.log('on focus')
    },
    onFocus () {
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
  },
  data () {
    return {
      results: [],
      value: ''
    }
  }
}
function getResult (val) {
  let rs = []
  for (let i = 0; i < 20; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>
