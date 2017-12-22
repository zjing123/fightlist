<template>
  <div>
    <group>
      <x-button type="primary" @click.native="">Test</x-button>
    </group>
    <group>
      <x-button type="primary" @click.native="">Test1</x-button>
    </group>
    <group>
      <x-button type="primary">Test2</x-button>
    </group>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Box, XButton, Toast } from 'vux'
import { mapState, mapGetters } from 'vuex'
import config from '@/config/base.config'

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

  },
  computed: {
  },
  data () {
    return {
      submit001: 'click me',
      disable001: false,
      fights: null,
      fightings: null
    }
  }
}
</script>
