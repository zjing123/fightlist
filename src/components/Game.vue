<template>
  <div>
    <div class="game-round-info">
      <flexbox class="round-user">
           <flexbox-item>
             <div class="flex-round-user">
               <img class="image" src="../assets/user.jpg"/>
             </div>
           </flexbox-item>
           <flexbox-item>
             <div class="flex-round-user">

             </div>
           </flexbox-item>
           <flexbox-item>
             <div class="flex-round-user">
               <img class="image" src="../assets/user.jpg"/>
             </div>
           </flexbox-item>
         </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem  } from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped>
  .game-round-info {
    padding: 10px 15px;
  }

  .flex-round-user {
    text-align: center;
    color: #fff;
    background-color: #20b907;
    border-radius: 4px;
    background-clip: padding-box;
  }

  .round-user {
    height:45px;
  }

  .round-user .image{
    margin-top:20px;
    width:60px;
    height:60px;
    border-radius:60px;
    border:1px solid #fff;
    }
</style>
