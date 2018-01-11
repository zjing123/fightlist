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
    <div style="text-align:center;" v-if="result">
      <div style="padding:10px 0 5px 0;margin-left:5%;height:70%;width:90%;">
        <div class="scroller-pre scroller-pre-nopadding">
          <panel :header="result.result.title"  :type="type" @on-img-error="onImgError"></panel>
          <scroller lock-x height="-380" ref="scroller" class="answer-content-no-radius">
             <div class="box2">
               <div  v-if="getAnswers(result.result.id).length">
                 <x-table :cell-bordered="false">
                  <tbody>
                    <tr v-for="answer in getAnswers(result.result.id)">
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
                <div class="flex-demo prev-game" v-show="!result.isFirst">
                  <a href="javascript:void(0);" @click.navite="prevResult">{{ $t('prev')}}</a>
                </div>
            </flexbox-item>
              <flexbox-item>
                <div class="flex-demo">
                  <strong>{{ $t('score')}}： {{ getScore }}</strong>
                </div>
                </flexbox-item>
              <flexbox-item>
                <div class="flex-demo next-game" v-show="!result.isLast">
                  <a href="javascript:void(0);" @click.navite="nextResult">{{ $t('next')}}</a>
                </div>
            </flexbox-item>
            </flexbox>
          </div>
          <div style="height:40px;">
            <box>
              <x-button class="show-answer-btn" type="primary" @click.native="showAnswer" >{{ $t('check answers')}}</x-button>
            </box>
          </div>
        </div>
      </div>
    </div>
    <div>
      <x-dialog v-model="showAnswerBox">
        <div v-if="result">
          <panel :header="result.result.title"  :type="type" @on-img-error="onImgError"></panel>
          <div class="box2" style="height:200px;padding:0 0 15px;overflow:scroll;-webkit-overflow-scrolling:touch;">
            <div  v-if="result.result.answers.length">
              <x-table :cell-bordered="false">
               <tbody>
                 <tr v-for="answer in result.result.answers">
                   <td style="width:60%;text-align:left;padding-left:20%;">{{answer.title}}</td>
                   <td style="text-align:left;padding-left:10%;">
                     <span :class="[clasScoreNum, clasScoreNum + '-' + answer.score]">{{answer.score != 0 ? '+' : ''}}{{answer.score}}</span>
                   </td>
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
zh_CN:
  prev: "上一个"
  next: "下一个"
  score: "得分"
  check answers: "查看答案"
</i18n>

<script>
import { Flexbox, FlexboxItem, XButton, Group, Panel, Scroller, XInput, XTable, Box, XProgress, XDialog, Blur  } from 'vux'
import { mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import VmProgress from 'vue-multiple-progress'
import { getFightRecord } from '../api/server'

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
      result:null,
      userImageSrc: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
    }
  },
  methods: {
      onImgError (item, $event) {
      },
      ...mapMutations([
          'SYNC_RESULT',
          'SET_RESULTS'
      ]),
      showAnswer () {
          this.showAnswerBox = true
      },
      syncData() {
          this.SYNC_RESULT()
          window.localStorage.clear()
      },
      nextResult () {
          this.result = this.getNextRightResult(this.result.result.id)
      },
      prevResult () {
          this.result = this.getPrevRightResult(this.result.result.id)
      },
      getAnswers (id) {
          return this.getResultAnswersByQuestionId(id)
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
          access_token: state => state.access_token
      }),
      ...mapGetters([
          'getFirstRightResult',
          'getLastRightResult',
          'getNextRightResult',
          'getPrevRightResult',
          'getQuestionById',
          'getResultAnswersByQuestionId',
          'isEnd'
      ]),
      getScore () {
          var score = 0
          for( let i in this.getAnswers) {
              if(this.getAnswers[i].score !== undefined) {
                  score += parseInt(this.getAnswers[i].score, 10);
              }
          }
          return score;
      },
      question () {
          return this.getQuestionById(this.result.result.id)
      },
      async fetchData () {
          let id = this.$route.params.dataId | 0;

          let response;
          try {
              response = await getFightRecord(id);
              console.log(response)
              if(response.status === true) {
                  this.SET_RESULTS(response.data);
                  this.result = this.getFirstRightResult;
              } else {
                  this.$vux.toast.text(response.message, 'middle');
              }
          } catch (error) {
            console.log(error)
              this.$vux.toast.text('数据获取失败', 'middle')
          }
      }
  },
  mounted () {
      this.$nextTick(()=>{
      })
  },
  created () {
      this.fetchData
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
