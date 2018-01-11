<template>
  <div>
    <box gap="10px 10px">
       <x-button type="primary" link="/newgame">{{ $t('new game') }}</x-button>
    </box>
    <div style="margin-top:30px;" v-if="fights != null">
      <p style="padding-left:15px;color:#fff;" v-html="$t('game records')"></p>
      <group :title="$t('Single player game') + ':'" v-if="getFightsByType(1) != null" class="game-info">
        <cell is-link v-for="(fight, index) in getFightsByType(1)" :key="fight.id" :link="getLink(fight)">
          <div slot="title">
            <div class="circular--landscape" >
              <img src="domain + '/' + userinfo.avatar"/>
            </div>
            <div class="game-info-desc">
              <p class="title">{{ fight.user.name }}</p>
              <p class="desc">
                {{ $t('score') }}： <span>{{ fight.score }}</span>
              </p>
            </div>
          </div>
        </cell>
      </group>
      <group :title="$t('Multiplayer war') + ':'" v-if="getFightsByType(2) != null" class="game-info">
        <cell is-link v-for="(fight, index) in getFightsByType(2)" :key="fight.id" :link="getLink(fight)">
          <div slot="title">
            <div class="circular--landscape" >
              <img src="../assets/user.jpg"/>
            </div>
            <div class="game-info-desc">
              <p class="title">{{ fight.user.name }}[{{ fight.created_at }}]</p>
              <p class="desc">
                {{ $t('score') }}：<span>{{ fight.score }}</span>
              </p>
            </div>
          </div>
        </cell>
      </group>
      <group :title="$t('unfinished game') + ':'" v-if="getUnfinishedFight() != null" class="game-info">
        <cell is-link v-for="(fight, index) in getUnfinishedFight()" :key="fight.id" :link="getLink(fight)">
          <div slot="title">
            <div class="circular--landscape" >
              <img :src="image_path + '/' + userinfo.avatar"/>
            </div>
            <div class="game-info-desc">
              <p class="title">{{ fight.user.name }}</p>
              <p class="desc">
                {{ $t('score') }}：<span>{{ fight.score }} - {{ fight.fight.type }}</span>
              </p>
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
  game type: "Game type"
  unfinished game: "Unfinished games"
zh_CN:
  new game: "新游戏"
  game records: "游戏记录"
  score: 得分
  game type: "游戏类型"
  unfinished game: "未完成游戏"
</i18n>

<script>
import { Tabbar, TabbarItem, Group, Cell, Box, XButton, Toast, XDialog } from 'vux'
import { mapState, mapGetters, mapMutations } from 'vuex'
import config from '@/config/base.config'
import _ from 'lodash'
import { getFights } from '@/api/server'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell,
    Box,
    XButton,
    XDialog
  },
  methods: {
    ...mapMutations([
      'setAccessToken'
    ]),
    change (value) {
      console.log('change:', value)
    },
    getLink (fight) {
        if(fight.fight.type === 1) {
            return {name: 'Result', params:{dataId: fight.id}};
        }

        if(fight.fight.type === 2) {
            return {name: 'Fights', params:{dataId: fight.fight.id}};
        }
    },
    async fetchData () {
        let response;

        try{
            response = await getFights();
            this.fights = response.data.fights;
        } catch (err) {
            this.$vux.toast.text(this.$t('not found data'), 'middle');
            return;
        }
    },
    getFightsByType ( type ) {
      if(this.fights === null) {
        return null
      }

      let fights =  this.fights.filter(function (fight) {
        return fight.fight.type == type && fight.finished == 1
      })

      if(_.isEmpty(fights)) {
        return null
      }

      return fights
    },
    getUnfinishedFight () {
      if(this.fights === null) {
        return null
      }

      let fights =  this.fights.filter(function (fight) {
        return fight.finished == 0
      })

      if(_.isEmpty(fights)) {
        return null
      }

      return fights
    }
  },
  computed: {
    ...mapState({
        state: state => state,
        image_path: state => state.image_path,
        userinfo: state => state.userinfo,
        lang: state => state.locale,
        access_token : state => state.access_token
    }),
    ...mapGetters([
    ]),
  },
  data () {
    return {
      fights: null,
      fightings: null,
    }
  },
  created () {
    this.fetchData()
    if(this.access_token != '') {
      this.showToast = false
    }
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
    /*margin-left:-50%;*/
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
