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
      <x-button type="primary" link="/play" v-show="isplay">开始游戏</x-button>
    </div>
  </div>
</template>

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
      lang: state =>  state.locale
    })
  },
  mounted() {
    this.$nextTick(()=>{
    })
  },
  created () {
    let params = {
      lang: this.lang,
      type: 1,//单人游戏
    }

    let localStorage = window.localStorage
    if(!localStorage.getItem('questions')) {
      var that = this
      this.$http.post(BASE_URL + "fights", params).then((response) => {
        if (response.data.status == 'success') {
          this.$store.commit('setQuestions', response.data.data)
          this.$store.commit('setFightId', response.data.data)
          that.isplay = true
        } else {
          this.$vux.toast.text(response.data.message, 'middle')
        }
      }).catch(err => {
        console.log(err)
        this.$vux.toast.text('数据获取失败', 'middle')
      })
    } else {
      this.isplay = true
    }
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
