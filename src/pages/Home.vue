<template>
  <div>
    <box gap="10px 10px">
       <x-button type="primary" link="/newgame">新游戏</x-button>
    </box>
    <div style="margin-top:30px;" v-if="results.length">
      <group title="<span class='title'>游戏记录</span>" class="game-info">
        <cell is-link v-for="(result, index) in results" :link="{name: 'result', params:{dataId: index}}">
          <div slot="title">
            <div class="circular--landscape" >
              <img src="../assets/user.jpg"/>
            </div>
            <div class="game-info-desc">
              <p class="title">Guest</p>
              <p class="desc">得分：<span>{{ result.score }}</span></p>
            </div>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell, Box, XButton } from 'vux'
import { mapState } from 'vuex'
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
    change (value) {
      console.log('change:', value)
    },
    processButton001 () {
      this.submit001 = 'processing'
      this.disable001 = true
    }
  },
  computed: {
    ...mapState({
      results: state => state.results
    }),
  },
  data () {
    return {
      submit001: 'click me',
      disable001: false
    }
  },
  created () {
    this.$http.get("/api/questions").then((response) => {
      this.$store.commit('setQuestions', response.data)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style>
.circular--landscape{
    display:inline-block;
    position:relative;
    width:50px;
    height:50px;
    overflow:hidden;
    border-radius:50%;
    top:4px;
}

.circular--landscape img{
    width:auto;
    height:100%;
    margin-left:-50%;
}

.weui-cells__title {
  color:#fff !important;
  font-size:16px !important;
}
.game-info-desc {
  display: inline-block;
  height:50px;
  margin-left:5px;
}

.game-info-desc .title {
  font-size:1em;
  font-weight: bold;
}
.game-info-desc .desc {
  padding-top:5px;
  font-size:0.8em;
}
</style>
