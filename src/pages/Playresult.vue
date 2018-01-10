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
    <div style="text-align:center;" v-if="currentResult.result">
      <div style="padding:10px 0 5px 0;margin-left:5%;height:70%;width:90%;">
        <div class="scroller-pre scroller-pre-nopadding">
          <panel :header="currentResult.result.title"  :type="type" @on-img-error="onImgError"></panel>
          <scroller lock-x height="-420" ref="scroller" class="answer-content-no-radius">
             <div class="box2">
               <div  v-if="currentResult.result.answers.length">
                 <x-table :cell-bordered="false">
                  <tbody>
                    <tr v-for="answer in currentResult.result.answers">
                      <td style="width:60%;text-align:left;padding-left:20%;">{{answer.title}}</td>
                      <td style="text-align:left;padding-left:10%;">
                        <span :class="[clasScoreNum, clasScoreNum + '-' + answer.score]">{{answer.score != 0 ? '+' : ''}}{{answer.score}}</span>
                      </td>
                    </tr>
                  </tbody>
                </x-table>
               </div>
             </div>
          </scroller>
          <div style="background:#f8f8f8;height:40px;">
            <flexbox>
              <flexbox-item>
                <div class="flex-demo prev-game" v-show="!currentResult.isFirst">
                  <a href="javascript:void(0);" @click.navite="getPrevRightResult">上一个</a>
                </div>
            </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <strong>{{ $t('score') }}： {{ getScore }}</strong>
                </div>
                </flexbox-item>
              <flexbox-item>
                <div class="flex-demo next-game" v-show="!currentResult.isLast">
                  <a href="javascript:void(0);" @click.navite="getNextRightResult">下一个</a>
                </div>
            </flexbox-item>
            </flexbox>
          </div>
          <div style="height:40px;">
            <box>
              <x-button class="show-answer-btn" type="primary" @click.native="showAnswer" >{{ $t('check answers') }}</x-button>
            </box>
          </div>
        </div>
        <div style="margin-top:10px;" v-show="!isEnd">
          <x-button type="primary" link="/play">{{ $t('continue the game') }}</x-button>
        </div>
        <div style="margin-top:10px;" v-show="isEnd">
          <x-button type="primary" @click.native="syncData">{{ $t('return home page') }}</x-button>
        </div>
      </div>
    </div>
    <div>
      <x-dialog v-model="showAnswerBox">
        <div v-if="currentResult.result">
          <panel :header="question.title"  :type="type" @on-img-error="onImgError"></panel>
          <div class="box2" style="height:200px;padding:0 0 15px;overflow:scroll;-webkit-overflow-scrolling:touch;">
            <div  v-if="question.answers.length">
              <x-table :cell-bordered="false">
               <tbody>
                 <tr v-for="i in question.answers">
                   <td style="width:60%;text-align:left;padding-left:20%;">{{i.title}}</td>
                   <td style="text-align:left;padding-left:10%;"><span class="score-num score-num-1">+{{i.score}}</span></td>
                 </tr>
               </tbody>
             </x-table>
            </div>
          </div>
           <div @click="showAnswerBox=false">
             <span class="vux-close"></span>
           </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<i18n>
en:
  prev: "Previous"
  next: "Next"
  score: "Score"
  check answers: "Check Answers"
  return home page: "Home"
  continue the game: "Continue the game"
zh_CN:
  prev: "上一个"
  next: "下一个"
  score: "得分"
  check answers: "查看答案"
  return home page: "返回首页"
  continue the game: "继续游戏"
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
      gameStart: 1,
      type: '4',
      questionId: 1,
      answers: [],
      times: 100,
      striped: true,
      showAnswerBox: false,
      clasScoreNum: 'score-num',
      currentResult:null,
      userImageSrc: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
      images: [
        'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
        'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
      ]
    }
  },
  methods: {
    onImgError (item, $event) {
    },
    ...mapMutations([
      'SYNC_RESULT'
    ]),
    showAnswer () {
      this.showAnswerBox = true
    },
    clearStorage () {
      var windowLocalStorage = window.localStorage
      if(windowLocalStorage.getItem('currentResults')) {
        windowLocalStorage.removeItem('currentResults')
      }

      if(windowLocalStorage.getItem('record_id')) {
        state.record_id = windowLocalStorage.removeItem('record_id')
      }

      if(windowLocalStorage.getItem('questionGroup')){
        state.questionGroup = windowLocalStorage.removeItem('questionGroup')
      }

      if(windowLocalStorage.getItem('questions')) {
        windowLocalStorage.removeItem('questions')
      }

      if(windowLocalStorage.getItem('usedIndexes')) {
        windowLocalStorage.removeItem('usedIndexes')
      }
    },
    syncData() {
      let params = {
        lang: this.lang,
        record_id: this.record_id,
        result: this.currentResults,
        score: this.totalScore(),
        finished: 1
      }
      let config = {
        headers: {
          common: {
            Authorization : this.access_token
          }
        }
      }

      this.SYNC_RESULT()
      this.$http.post(BASE_URL + "fightrecords", params, config).then((response) => {
        if (response.data.status == 'success') {
          if(response.data.data.finished == true) {
            this.clearStorage()
          } else {
          }
          this.$router.push({name: 'Home'})
        } else {
          this.$vux.toast.text(response.data.message, 'middle')
          this.$router.push({name: 'Home'})
        }
      }).catch(err => {
        this.$router.push({name: 'Home'})
        this.$vux.toast.text(this.$t('not found data'), 'middle')
      })
    },
    totalScore () {
      var score = 0;
      for( var result in this.currentResults) {
        for( var answer in result.answers) {
          score += parseInt(answer.score)
        }
      }

      return score
    },
    getNextRightResult () {
      let result = this.getNextCurrentResult(this.currentResult.result.id)
      this.currentResult = result
    },
    getPrevRightResult () {
      let result = this.getPrevCurrentResult(this.currentResult.result.id)
      this.currentResult = result
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      state: state => state,
      questions: state => state.questions,
      time: state => state.time,
      percentage: state => state.percentage,
      currentResults: state => state.currentResults,
      record_id: state => state.record_id,
      access_token: state => state.access_token
    }),
    ...mapGetters([
      'getLastCurrentResult',
      'getNextCurrentResult',
      'getPrevCurrentResult',
      'getQuestionById',
      'isEnd'
    ]),
    gameState () {
      let len = this.currentResults.length;
      if(len == 0) {
        return 1;
      } else if (len < 3) {
        return 2;
      } {
        return 3;
      }
    },
    getScore () {
      var score = 0
      for( let i in this.currentResult.result.answers) {
        if(this.currentResult.result.answers[i].score !== undefined) {
          score += parseInt(this.currentResult.result.answers[i].score, 10);
        }
      }

      return score;
    },
    question () {
      return this.getQuestionById(this.currentResult.result.id)
    }
  },
  mounted() {
    this.$nextTick(()=>{
    })
  },
  created () {
    this.currentResult = this.getLastCurrentResult
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

    .weui-panel__hd {
      text-align: center;
      background-color:#d9d9d9;
      color:#939393;
      font-size:1.5em;
      font-weight: bold;
    }

    .weui-cells__title {
      background-color:#fff;
      color: #999999;
      font-size: 13px;
    }
    .show-answer-btn {
      border-radius: 0 0 5px 5px;
      background-color:#ffba00 !important;
    }
    .scroller-pre {
      background:#d1d1d1;
      padding-bottom:4px;
      border-radius: 0 0 5px 5px;
    }
    .scroller-pre-nopadding {
      padding-bottom:0;
    }
    .answer-content {
      background-color:#fff;
      border-radius: 0 0 5px 5px;
    }
    .answer-content-no-radius {
      background-color:#fff;
    }

    .score-num {
      font-size: 12px;
      font-weight: bold;
      width:40px;
      height:30px;
      line-height: 30px;
      color:#fff;
      border-radius:5px;
      text-align: center;
      display: inline-block;
      padding: 0 3px;
    }
    .score-num-0 {
      background-color:#b8b8b8;
    }
    .score-num-1 {
      background-color: #01d72f;
    }
    .score-num-2 {
      background-color: #fd8324;
    }
    .score-num-3 {
      background-color: #b966f3;
    }
    .box1 {

  position: relative;
  width:1400px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  float: left;
  text-align: center;
  line-height: 100px;
  margin-left:15px;
  padding:10px 0 5px 0;
  height:80%;
  width:300px;
}

.box1-item:first-child {
  margin-left: 15px;
}

.flex-demo {
  text-align: center;
  line-height: 40px;
}
.next-game, .prev-game {
  color:#2d84cc;
}
.next-game a, .prev-gama a {
  display: inline-block;
}
</style>
