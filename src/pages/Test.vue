<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group>
      <x-button type="primary"></x-button>
    </group>
    <group>
      <div data-v-30f16050="" class="vux-x-input weui-cell weui-vcode">
        <div class="weui-cell__bd weui-cell__primary">
          <input
          id="vux-x-input-q4sfh"
          autocomplete="off"
          autocapitalize="off"
          autocorrect="off"
          autofocus="autofocus"
          spellcheck="false"
          type="text"
          placeholder="答案..."
          class="weui-input"
          @focus="onfocus"
          ref="input"
          v-focus
          >
        </div>
        <div class="weui-cell__ft">
          <x-button type="primary" mini @click.native="onsubmit">确认</x-button>
        </div>
      </div>
    </group>

  </div>
</template>

<script>
import { Group, Cell, XInput, XButton} from 'vux'
import VmInput from 'vue-multiple-input'

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton
  },
  data () {
    return {
      msg: 'Hello World!',
      value:''
    }
  },
  methods: {
    onblur($event) {
      $event.target.focus()
    },
    onfocus($event) {
      $event.target.focus()
    },
    onenter($event) {
      $event.target.focus()
    },
    onsubmit($event) {
      this.$refs.input.focus()
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
.weui-input {
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
}
</style>
