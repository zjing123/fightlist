<template>
  <div>
    <x-header slot="header" :title="title"></x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  components: {
    XHeader
  },
  methods: {
    console () {
      console.log('click')
    }
  },
}
</script>

<style>
.vux-x-icon {
  fill: #F70968;
}
.cell-x-icon {
  display: block;
  fill: green;
}
</style>
