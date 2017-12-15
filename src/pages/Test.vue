<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <x-input title="title" v-model="value" ref="input" @on-focus="onfocus"></x-input>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XInput} from 'vux'
import VmInput from 'vue-multiple-input'


export default {
  components: {
    Group,
    Cell,
    XInput,
    VmInput
  },
  data () {
    return {
      msg: 'Hello World!',
      value:''
    }
  },
  methods: {
    onblur(value, $event) {
      $event.target.focus()
      console.log(this.$refs.input)
    },
    onfocus(value, $event) {
      $event.target.focus()
      console.log(this.$refs.input)
    },
    onenter(value, $event) {
      $event.target.click();
      $event.target.focus()
      console.log(this.$refs.input)
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
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
