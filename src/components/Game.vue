<template>
  <div>
    <div class="game-round-info" v-show="!gameStart">
      <flexbox class="round-user">
           <flexbox-item>
             <div class="flex-round-user">
             </div>
           </flexbox-item>
           <flexbox-item>
             <div class="flex-round-user">
              <img class="image" src="../assets/user.jpg"/>
              <div style="clear:both;"></div>
              <span style="margin-top:5px;">{{ state.username }}</span>
             </div>
           </flexbox-item>
           <flexbox-item>
             <div class="flex-round-user">
             </div>
           </flexbox-item>
      </flexbox>
      <div class="play-button">
        <x-button type="primary" @click.native="playGame">开始游戏</x-button>
      </div>
    </div>
    <div style="text-align:center;" v-show="gameStart">
      <div style="padding:10px 0 5px 0;margin-left:5%;height:80%;width:90%;">
        <box>
          <x-progress :percent="times" :show-cancel="false"></x-progress>
        </box>
        <panel :header="questions[questionId].question"  :type="type" @on-img-error="onImgError"></panel>
        <div class="scroller-pre">
          <scroller lock-x height="-200" ref="scroller" class="answer-content">
             <div class="box2">
               <div  v-if="answers.length">
                 <x-table :cell-bordered="false">
                  <tbody>
                    <tr v-for="i in answers">
                      <td style="width:60%;text-align:left;padding-left:20%;">{{i.name}}</td>
                      <td style="text-align:left;padding-left:10%;">{{i.num}}</td>
                    </tr>
                  </tbody>
                </x-table>
               </div>

             </div>
          </scroller>
        </div>
        <div style="margin-top:15px;">
          <group>
            <x-input class="weui-vcode" placeholder="答案..." :show-clear="false"  @on-enter="onEnter" ref="answerInput">
              <x-button slot="right" type="primary" mini>确认</x-button>
            </x-input>
          </group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XButton, Group, Panel, Scroller, XInput, XTable, Box, XProgress  } from 'vux'
import { mapState, mapAction} from 'vuex'

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
    XProgress
  },
  data () {
    return {
      gameStart: false,
      type: '4',
      questionId: 1,
      answers: [],
      times: 100
    }
  },
  methods: {
    playGame() {
      let me = this;
      me.gameStart = true
      // let interval = window.setInterval(function() {
      //     if ((me.times--) <= 0) {
      //       window.clearInterval(interval);
      //     }
      //   }, 1000);
    },
    onImgError(item, $event) {
      console.log(item, $event)
    },
   onEnter(value, $event) {
     let name = value
     let score = this.questions[this.questionId].answers.findIndex(x => x == value) !== -1 ? 1 : 0
     this.answers.push({name:name, num:score})
     this.$refs.answerInput.reset()
     this.$refs.answerInput.blur()
   }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      state: state => state,
      questions: state => state.questions,
      question: state => state.questions,
      time: state => state.time
    }),
    title() {
      console.log(this.state)
      this.$store.commit('setTitle', 'game')

      return 'Demo-' + this.state.title
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.$refs.scroller.reset({top:0});
    }),
    this.$refs.answerInput.focus()
  },
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

    .play-button {
      margin-top: 50px;
    }

    .weui-panel__hd {
      text-align: center;
      background-color:#d9d9d9;
      color:#939393;
      font-size:1.5em;
      font-weight: bold;
    }
    .weui-cells {

    }
    .weui-cells__title {
      background-color:#fff;
      color: #999999;
      font-size: 13px;
    }
    .scroller-pre {
      background:#d1d1d1;
      padding-bottom:4px;
      border-radius: 0 0 5px 5px;
    }
    .answer-content {
      background-color:#fff;
      border-radius: 0 0 5px 5px;
    }
    .weui-vcode {
      /*padding:0 !important;*/
    }
    .weui-progress__bar {
      height:30px !important;
    }
</style>
