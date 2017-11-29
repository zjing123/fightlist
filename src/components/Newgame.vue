<template>
  <div>
  <search
  @result-click="resultClick"
  @on-change="getResult"
  :results="results"
  v-model="value"
  position="fixed"
  auto-scroll-to-top top="46px"
  @on-focus="onFocus"
  @on-cancel="onCancel"
  @on-submit="onSubmit"
  ref="search"></search>
  <div style="padding:15px;">
    <x-button @click.native="setFocus" type="primary">set focus</x-button>
  </div>
  <div>
    <group>
      <cell title="单人游戏" is-link link="/game">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png"/>
      </cell>
      <cell title="多人游戏" is-link link="/sticky">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png"/>
      </cell>
    </group>
  </div>
</div>
</template>

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
      value: 'test'
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
