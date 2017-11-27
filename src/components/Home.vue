<template>
  <div>

    123
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  components: {
    XHeader
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
