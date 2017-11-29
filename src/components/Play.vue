<template>
  <div style="text-align:center;">
    <div style="padding:10px 0 5px 0;margin-left:5%;height:80%;width:90%;">
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
</template>


<script>
import { Group, Panel, Scroller, XButton, XInput, XTable  } from 'vux'
import { mapState, mapGetters, mapAction} from 'vuex'

export default {
  components: {
    Group,
    Panel,
    Scroller,
    XButton,
    XInput,
    XTable
  },
  data() {
    return {
      type: '4',
      questionId: 1,
      answers: []
    }
  },
  methods: {
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
 mounted() {
   this.$nextTick(()=>{
     this.$refs.scroller.reset({top:0});
   }),
   this.$refs.answerInput.focus()
 },
 computed: {
   ...mapState({
     questions: state => state.questions,
     question: state => state.questions
   })
 }
}
</script>

<style>
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
</style>
