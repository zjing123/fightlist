<template>
  <div>
    <div >
      <blur :blur-amount="10" :url="userImageSrc" :height="180">
      <p class="center">
        <img :src="userImageSrc">
      </p>
      <p style="text-align:center;color:#fff;">
        <span style="margin-top:5px;">{{ state.userinfo.name }}</span>
      </p>
      </blur>
    </div>
    <div class="play-button">
      <x-button type="primary" link="/play" v-show="isplay">{{ $t('start the game')}}</x-button>
      <x-button type="primary" v-show="replay" @click.native="fetchData">{{ $t('replay')}}</x-button>
    </div>
  </div>
</template>


<i18n>
en:
  no more question: "No more games"
  create game failed: "Failed created game"
  start the game: "PLAY"
  replay: 'REPLAY'
zh_CN:
  no more question: "没有更多游戏了"
  create game failed: "游戏创建失败"
  start the game: '开始游戏'
  replay: '重新开始'
</i18n>

<script>
import { Flexbox, FlexboxItem, XButton, Group, Panel, Scroller, XInput, XTable, Box, XProgress, XDialog, Blur  } from 'vux'
import { mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import VmProgress from 'vue-multiple-progress'
import * as types from '@/store/mutation-types'
import { createNewGame } from '../api/server'

export default {
    components: {
        Flexbox,
        FlexboxItem,
        XButton,
        Group,
        Panel,
        Scroller,
        XInput,
        XTable,
        Box,
        XProgress,
        VmProgress,
        XDialog,
        Blur
    },
    data () {
        return {
            userImageSrc: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
            images: [
              'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
              'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
              'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
            ],
            isplay: false,
            replay: false
        }
    },
    methods: {
        ...mapMutations([
            "RECORD_QUESTIONS"
        ]),
        async fetchData () {
            try {
                let response = await createNewGame({
                  lang: this.lang,
                  type: this.$route.params.type
                });

                if(response.status) {
                    this.RECORD_QUESTIONS(response.data);
                    this.isplay = true;
                    this.replay = false;
                } else {
                    this.replay = true;
                    this.$vux.toast.text(this.$t(response.data.message), 'middle')
                }
            } catch (error) {
                this.$vux.toast.text(this.$t('not found data'), 'middle')
            }
        }
    },
    computed: {
        ...mapState({
          state: state => state,
          lang: state =>  state.locale,
        })
    },
    mounted() {
        this.$nextTick(()=>{
        })
    },
    created () {
        this.fetchData();

      // let localStorage = window.localStorage
      // if(!localStorage.getItem('questions')) {
      // } else {
      //   this.isplay = true
      // }
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
  background-color: #02a2d1;
  border-radius: 4px;
  background-clip: padding-box;
  }

  .round-user {

  }

  .round-user .image{
  margin-top:20px;
  width:60px;
  height:60px;
  border-radius:60px;
  border:1px solid #fff;
  }

  .center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
  }
  .center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
  }

  .play-button {
    padding: 10px 15px;
    margin-top: 50px;
  }
</style>
