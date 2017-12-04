<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="hello" value="cool" is-link link="/hello"></cell>
      <cell title="Tabbar" value="cool" is-link link="/tabbar"></cell>
      <cell title="Button" value="cool" is-link link="/button"></cell>
      <cell title="Icon" value="cool" is-link link="/icon"></cell>
      <cell title="Header" value="cool" is-link link="/header"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XHeader } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XHeader
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  computed: {
    title() {
      return 'Demo';
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
