<template>
     <div class="tl-addition-container">
        <div class="item-title">
            <div class="item-type"><span>{{additionType}}</span></div>
        </div> 
        <div class="edit-property-row single-input">
            <ct-check-box 
                :label="$t('socialLogPage.changeDate')"
                :checked="lTAdditionsObj.differentDate"
                @change="setCustomDate"
            />
        </div>
        <div  class="edit-date-row date-input" v-if="lTAdditionsObj.differentDate">
            <ctk-date-time-picker
                v-model="lTAdditionsObj.customDate"
                :minute-interval="1"
                :label="$t('socialLogPage.chooseDate')"
                locale="sv"
                time-format="HH:mm"
                color="#52C8F8"
                enable-button-validate
                :min-date="minCustomDate"
                :max-date="maxCustomDate"
            />
        </div>
        <div class="edit-property-row single-input">
            <ct-text-area
                :label="$t('socialLogPage.logText')"
                :placeholder="$t('socialLogPage.logTextPlaceholder')"
                v-model="lTAdditionsObj.lTAdditionsText"
            />
                <!-- v-validate="'required|max:150|min:3'"
                :name="$t('addReceiptPage.purpose')" :error="errors.first($t('addReceiptPage.purpose'))" -->
        </div>
        <div v-if="lTAdditionsObj.type" class="edit-property-row single-input">
            <ct-info-box :text="testInfoText"/>
        </div>
        <div class="edit-property-row single-input">
            <button class="btn btn-success" @click="submitTLAddition">Signera och skicka in <i class="fas fa-arrow-alt-circle-right"></i></button>
            <button class="btn btn-warning"  @click="cancelTLAddition">{{$t('misc.cancel')}}  <i class="far fa-times-circle"></i></button>
        </div>
    </div>
</template>
<script>
import DropDown from '@/components/DropDown'
import moment from "moment"
import InfoBox from '@/components/InfoBox'
import TextArea from '@/components/TextArea'
import CheckBox from '@/components/CheckBox'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';

export default {
    props:["additionType","additionTypeId","logTextId"],
    components:{
        "ct-dropdown":DropDown,
        "ct-info-box":InfoBox,
        "ct-text-area":TextArea,
        "ct-check-box":CheckBox,
        "ctk-date-time-picker": VueCtkDateTimePicker
    },
    created(){
        // this.lTAdditionsObj.lTAdditionsType = this.additionType;  
        this.lTAdditionsObj.lTAdditionsTypeId = this.additionTypeId;
        this.lTAdditionsObj.logTextId = this.logTextId;
        
    },
    computed:{
        minReminderDate(){
            return moment().add(1,"days").format('YYYY-MM-DD');
        },
        getReminderLabel(){
            return (!this.lTAdditionsObj.reminded)?this.$t('socialLogPage.setReminderDate'):this.$t('socialLogPage.unsetReminderDate')
        },
        maxCustomDate(){
            return moment().add(1,"days").format("YYYY-MM-DD");
        },
        minCustomDate(){
            return moment().subtract(7, "days").format('YYYY-MM-DD');
        },
    },
    methods:{
        setCustomDate(){
            this.lTAdditionsObj.differentDate = !this.lTAdditionsObj.differentDate;
            if(!this.lTAdditionsObj.differentDate){
                this.lTAdditionsObj.customDate = undefined;
            }
        },
        setReminderDate(){
            this.lTAdditionsObj.reminded = !this.lTAdditionsObj.reminded;
            if(!this.lTAdditionsObj.reminded){
                this.lTAdditionsObj.reminderDate = undefined;
            }
        },
        submitTLAddition(){
            console.log("hello world",this.lTAdditionsObj);
            this.axios
            .post(`client/logtext/addition`,this.lTAdditionsObj)
            .then(resposen=>{
                this.addLog = !this.addLog;
                this.$emit('done');
            });
        },
        cancelTLAddition(){
            console.log("cancel");
            this.$emit('cancel');
        }
    },
    data(){
        return{
            addLog:false,
            logTexts:undefined,
            ltAdditionType: undefined,
            lTAdditionsObj:{
                logTextId:undefined,
                lTAdditionsText:undefined,
                differentDate:false,
                customDate:undefined,
                reminderDate:undefined,
                lTAdditionsTypeId:undefined,
                reminded:false,
                signerId:1
            },
            testInfoText:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu metus at ex elementum efficitur. Donec in turpis eu dolor gravida mattis sed quis orci. Proin erat lacus, aliquam vel nunc non, pulvinar cursus tortor. Sed nulla quam, consequat ac enim ac, cursus ultrices elit. Ut libero purus, accumsan ac nisl at, elementum vehicula ex."
        };
    }, 
}
</script>
<style lang="postcss" scoped>
.tl-addition-container{
    margin-left: 25px;
    margin-bottom: 20px;
}
.item-type{
    text-align: left;
    display:inline-block;
    color: #ff9045;
}
.item-title{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-dot-button {
    visibility: hidden;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
    &:hover {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    color: #374b64;

    .item-dot-button {
      visibility: visible;
    }
  }
}
.btn{
    margin-right: 20px;
}
.btn-warning{
    padding-left:30px;
    padding-right:30px;
    color: white
 }
.log-item{
    background: white;
    margin-bottom: 10px;  
    min-height:60px;  
    border-radius: 10px;
    padding: 10px;
}

.container{
    margin-left: 25px;
    margin-right: 25px;
}
.log-container{
    margin-top: 40px;

}
.line-div{
    border-top: double;
    margin-bottom: 10px;
}
.edit-date-row{
  margin-top: 10px;
  display: flex;
  > div {
    flex: 1;
  }

  &:not(.text-area) {
    > div {
      &:first-child {
        margin-right: 10px;
      }
    }
  } 
}
.edit-property-row {
  margin-top: 20px;
  display: flex;
  > div {
    flex: 1;
  }

  &:not(.text-area) {
    > div {
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.date-input{
    width: 350px;
    
}
.single-input {
  > div {
    flex: 0.5;
  }
}

</style>


