<template>
  <div>
    <div >
      <blur :blur-amount="10" :url="userImageSrc" :height="180">
      <p class="center">
        <img :src="userImageSrc">
      </p>
      <p style="text-align:center;color:#fff;">
        <span style="margin-top:5px;">{{ state.username }}</span>
      </p>
      </blur>
    </div>
    <div class="play-button">
      <x-button type="primary" link="/play" v-show="isplay">{{ $t('start the game')}}</x-button>
    </div>
  </div>
</template>


<i18n>
en:
  no more question: "No more games"
  create game failed: "Failed created game"
  start the game: "PLAY"
zh_CN:
  no more question: "没有更多游戏了"
  create game failed: "游戏创建失败"
  start the game: '开始游戏'
</i18n>

<script>
import { Flexbox, FlexboxItem, XButton, Group, Panel, Scroller, XInput, XTable, Box, XProgress, XDialog, Blur  } from 'vux'
import { mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import VmProgress from 'vue-multiple-progress'

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
      isplay: false
    }
  },
  methods: {
    onImgError (item, $event) {
    }
  },
  computed: {
    ...mapState({
      state: state => state,
      lang: state =>  state.locale,
      access_token: state => state.access_token
    })
  },
  mounted() {
    this.$nextTick(()=>{
    })
  },
  created () {
    let type = this.$route.params.type
    let params = {
      lang: this.lang,
      type: type,//游戏
    }
    let config = {
      headers: {
        common: {
          Authorization : this.access_token
        }
      }
    }

    var that = this
    this.$http.post(BASE_URL + "fights", params, config).then((response) => {
      if (response.data.status == 'success') {
        this.$store.commit('setQuestions', response.data.data)
        this.$store.commit('setRecordId', response.data.data)
        that.isplay = true
      } else {
        this.$vux.toast.text(this.$t(response.data.message), 'middle')
      }
    }).catch(err => {
      this.$vux.toast.text(this.$t('not found data'), 'middle')
    })

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
