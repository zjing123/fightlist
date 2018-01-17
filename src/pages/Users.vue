<template>
  <div>
    <div v-if="fights != null">
      <group class="game-info">
        <cell is-link v-for="(fight, index) in fights" :key="index" :link="{name: 'Result', params:{dataId: fight.id}}">
          <div slot="title">
            <div class="circular--landscape" >
              <img :src="image_path + '/' + fight.user.avatar"/>
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
import { getFightUsers } from '@/api/server'

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
    async fetchData () {
        let id = this.$route.params.dataId | 0;

        let response;
        try{
            response = await getFightUsers(id);
            if(response.status === true) {
                this.fights = response.data.results;
            } else {
                this.$vux.toast.text(this.$t(resonse.message), 'middle');
            }
        } catch (err) {
            this.$vux.toast.text(this.$t('not found data'), 'middle');
            this.$router.go(-1);
            return;
        }
    },
  },
  computed: {
    ...mapState({
        state: state => state,
        image_path: state => state.image_path,
        userinfo: state => state.userinfo,
        lang: state => state.locale,
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
    this.$nextTick(()=>{
      this.fetchData();
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

.game-info .weui-cells {
    /*margin-top:0px !important;*/
}
</style>
