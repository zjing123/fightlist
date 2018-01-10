<template>
  <div>
    <div style="text-align:center;" >
      <div style="padding:10px 0 5px 0;margin-left:5%;height:80%;width:90%;">
        <div>
        <vm-progress :percentage="percentage" :text-inside="true" :stroke-width="18" :striped="striped">{{time}}<b>s</b></vm-progress>
        </div>
        <panel :header="question.title"  :type="panelType" @on-img-error="onImgError"></panel>
        <div class="scroller-pre">
          <scroller lock-x :height="scrollHeight" ref="scroller" class="answer-content">
             <div class="box2">
               <div  v-if="result.answers.length">
                 <x-table :cell-bordered="false">
                  <tbody>
                    <tr v-for="answer in result.answers">
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
        </div>
        <div style="margin-top:15px;">
          <group>
            <div data-v-30f16050="" class="vux-x-input weui-cell weui-vcode">
              <div class="weui-cell__bd weui-cell__primary">
                <input
                id="vux-x-input-q4sfh"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                :autofocus="autofocus"
                spellcheck="false"
                type="text"
                :placeholder="$t('placeholder')"
                class="weui-input"
                @focus="focusHandle"
                @blur="blurHandle"
                @keyup.enter="enterHandle"
                v-model="value"
                ref="answerInput"
                >
              </div>
              <div class="weui-cell__ft">
                <x-button type="primary" mini @click.native="submitHandle" v-show="showButton">{{ $t('enter')}}</x-button>
              </div>
            </div>
          </group>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
en:
  placeholder: "answer..."
  enter: "Enter"
zh_CN:
  placeholder: "答案..."
  enter: "确认"
</i18n>

<script>
import { XButton, Group, Panel, Scroller, XInput, XTable, Box  } from 'vux'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import VmProgress from 'vue-multiple-progress'

export default {
  components: {
    XButton,
    Group,
    Panel,
    Scroller,
    XInput,
    XTable,
    Box,
    VmProgress,
  },
  data () {
    return {
      gameStart: 1,
      panelType: '4',
      result: {
        id: null,
        title: null,
        answers: []
      },
      striped: true,
      showAnswerBox: false,
      clasScoreNum: 'score-num',
      value:'',
      scrollHeight: '-250',
      autofocus: false,
      showButton: true
    }
  },
  methods: {
    onImgError (item, $event) {
    },
    enterHandle (e) {
      let name = this.value
      if(name !== null && name !== undefined && name !== '') {
        let score = this.getScore(this.question.id, name)
        this.result.answers.unshift({title: name, score: score})
        this.$refs.answerInput.focus()
        this.value = ''
      } else {
        this.$refs.answerInput.focus()
      }
    },
    focusHandle($event) {
      this.scrollHeight = '80px';
      document.body.scrollTop = 0;
    },
    blurHandle($event) {
      this.scrollHeight = '-250';
    },
    submitHandle($event) {
      let name = this.value
      if(name !== null && name !== undefined && name !== '') {
        let score = this.getScore(this.question.id, name)
        this.result.answers.unshift({title: name, score: score})
        this.$refs.answerInput.focus()
        this.value = ''
      } else {
        this.$refs.answerInput.focus()
      }
    },
    ...mapMutations([
      'PUSH_CURRENT_RESULT',
      'PUSH_USED_INDEX'
    ])
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      state: state => state,
      time: state => state.time,
      percentage: state => state.percentage,
      record_id: state => state.record_id,
      lang: state => state.locale
    }),
    ...mapGetters({
      question: 'getQuestion',
      getQuestionByid: 'getQuestionById',
      getScore: 'getScore'
    }),
    disabled () {
      return this.time <= 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroller.reset({top: 0})
    })
  },
  watch: {
    '$store.state.time': function () {
      if (this.time <= 0) {
        let questionId = this.question.id
        this.result.id = questionId
        this.result.title = this.question.title
        this.PUSH_CURRENT_RESULT(this.result)
        this.PUSH_USED_INDEX(questionId)
        this.$router.push({name: 'Playresult'})
      }
    }
  }
}
</script>
<style scoped>
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
    .weui-input {
        width: 100%;
        border: 0;
        outline: 0;
        -webkit-appearance: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
        height: 1.41176471em;
        line-height: 1.41176471;
    }
</style>
