<template>
  <div>
    <box gap="10px 10px">
       <x-button type="primary" link="/newgame">{{ $t('new game') }}</x-button>
    </box>
    <div style="margin-top:30px;" v-if="!!fights">
      <group title="<span class='title'>$('game records')</span>" class="game-info">
        <cell is-link v-for="(fight, index) in fights" :key="fight.id" :link="{name: 'Result', params:{dataId: fight.id}}">
          <div slot="title">
            <div class="circular--landscape" >
              <img src="../assets/user.jpg"/>
            </div>
            <div class="game-info-desc">
              <p class="title">{{ fight.user.name }}</p>
              <p class="desc">{{ $t('score') }}：<span>{{ fight.score }}</span></p>
            </div>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<i18n>
en:
  new game: "New Game"
  game records: "Game Records"
  score: "Score"
zh_CN:
  new game: "新游戏"
  game records: "游戏记录"
  score: 得分
</i18n>

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
      lang: state => state.locale
    }),
    ...mapGetters([
      'getQuestion'
    ])
  },
  data () {
    return {
      submit001: 'click me',
      disable001: false,
      fights: null,
      fightings: null
    }
  },
  created () {
    let that = this
    let params = {
      lang: this.lang
    }
    this.$http.get(BASE_URL + "fights", params).then((response) => {
      if(response.data.status == 'success') {
        that.fights = response.data.data.fights
        that.fightings = response.data.data.fightings
      } else {
        that.$vux.toast.text(response.data.data.message, 'middle')
      }
    }).catch(err => {
      that.$vux.toast.text('数据获取失败', 'middle')
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
