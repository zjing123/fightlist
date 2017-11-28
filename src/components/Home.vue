<template>
  <div>
    <box gap="10px 10px">
       <x-button type="primary" link="/newgame">New Game</x-button>
    </box>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Box, XButton } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    Box,
    XButton
  },
  methods: {
    change (value) {
      console.log('change:', value)
    },
    processButton001 () {
      this.submit001 = 'processing'
      this.disable001 = true
    }
  },
  data () {
    return {
      submit001: 'click me',
      disable001: false
    }
  }
}
</script>
