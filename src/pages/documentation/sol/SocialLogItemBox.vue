<template>
<div  v-if="logItem" class="log-item">
    <div class="item-title">
        <div class="item-type"><span class="item-type-text">{{logItem.logTextTypeText}}</span>&nbsp;&nbsp;&nbsp;<i v-if="logItem.reminder" class="far fa-bell"></i></div>
        <!-- <div class="item-reminder"></div> -->
        <ct-dot-button class="item-dot-button" :options="getDotOptions()"/> 
        
    </div> 
    <div>
        <div class="item-body">
            <p>{{logItem.logText1}}</p>
        </div> 
        <div class="item-footer">
            <p>{{logItem.signer}} , {{date}}</p>
        </div>
    </div>
    <div v-if="logItem.tlAdditions">
        <ct-tl-addition 
                v-for="ltAddition in logItem.tlAdditions"
                :key="ltAddition.id"
                :tlAdditionItem="ltAddition"/>
    </div>
    <div v-if="enableReminder">
        <div class="edit-date-row date-input">
            <div class="reminder-section">
                <label class="input-label"><span>{{ $t('socialLogPage.reminderDateLabel') }}</span></label>
                <ctk-date-time-picker
                    class="date-input"
                    v-model="newReminderDate"
                    :minute-interval="1"
                    :label="$t('socialLogPage.chooseDate')"
                    locale="sv"
                    time-format="HH:mm"
                    color="#52C8F8"
                    enable-button-validate
                    :min-date="minReminderDate"
                /> 
            </div>
        </div>
        <div >
        <button class="btn btn-success btn-submit" @click="addReminder">Bekräfta <i class="fas fa-arrow-alt-circle-right"></i></button>
        <button class="btn btn-warning btn-submit"  @click="enableReminder = false">{{$t('misc.cancel')}}  <i class="far fa-times-circle"></i></button>
        </div>
    </div>
    <div v-if="addLTAdditions">
        <ct-add-lt-addition 
            :logTextId="logItem.id"
            :additionType="additionTypeToAdd"
            :additionTypeId="tLAdditionsTypeToAddId"
            @done="reload"
            @cancel="reload"/>
    </div>



</div>

</template>
<script>
import moment from "moment"
import DotButton from "@/components/DotButton";
import TlAddition from "./TlAddition"
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import AddLTAddition from './AddLTAdditions'

import VuejsDialog from 'vuejs-dialog';
// import VuejsDialogMixin from "vuejs-dialog/vuejs-dialog-mixin.min.js"

export default {
    components:{
        "ct-dot-button": DotButton,
        "ct-tl-addition": TlAddition,
        "ctk-date-time-picker": VueCtkDateTimePicker,
        "ct-add-lt-addition":AddLTAddition,
    },
    props:["logItem"],
    data(){
        return {
            item:undefined,
            enableReminder:false,
            newReminderDate:undefined,
            addLTAdditions:false,
            additionTypeToAdd:undefined,
            tLAdditionsTypeToAddId:undefined
        }
    },
    created(){
        console.log("from log item box",this.logItem);
    },
    methods:{
    addReminder(){  
        console.log("1");
        var obj={
            logTextId : this.logItem.id,
            reminderDate : this.newReminderDate,
            unitId : 1,
            signerId : 1
        }
        console.log(obj);
        this.axios
        .post(`client/logtext/reminder/`,obj)
        .then(response=>{
            this.enableReminder = false;
            this.reload();
        })
        // 
    },
    deleteLogText(){
        var msg = this.$t('socialLogPage.deleted');
        this.axios
        .delete(`client/logText/${this.logItem.id}`)
        .then(response=>{
            console.log("delete done");
            this.$dialog.alert(msg, {
                animation: 'zoom'
            })
            this.reload();

        })
    },
    getDotOptions() {
      let options = [
      {
        // label: this.$t("socialLogPage.addNote"),
        label: "Lägg till påminnelse",
        onClick: () => {
        this.enableReminder = true;
        }
       },
      {
        // label: this.$t("socialLogPage.addNote"),
        label: "Åtgärd",
        onClick: () => {
          console.log("2");
          this.additionTypeToAdd = "Åtgärd";
          this.tLAdditionsTypeToAddId = 2;
          this.addLTAdditions = true;
        }
      },
      {
        // label: this.$t("socialLogPage.addNote"),
        label: "Resultat av åtgärd",
        onClick: () => {
          console.log("3");
           this.additionTypeToAdd = "Resultat av åtgärd";
           this.tLAdditionsTypeToAddId = 3;
           this.addLTAdditions = true;
        }
      },
      {
        // label: this.$t("socialLogPage.addNote"),
        label: this.$t("socialLogPage.addNote"),
        onClick: () => {
          console.log("4");
           this.additionTypeToAdd = this.$t("socialLogPage.addNote");
           this.tLAdditionsTypeToAddId = 1;
           this.addLTAdditions = true;
        }
      },
      {
        // label: this.$t("socialLogPage.addNote"),
        label: "Avveckla",
        onClick: () => {
          console.log("5");
        //   var answer = confirm("Delete data?")
        //     if (answer) {
        //         console.log("yes")
        //         this.deleteLogText();
        //     }
        //     else {
        //          console.log("no")
        //     }
        this.confirm();
        }
      }
      ];
        if(this.logItem.reminder){
            options.shift();
        }
      return options;
    },
    reload(){
        this.addLTAdditions=false;
        console.log("test reload");
        this.$emit("reload");
    },
    confirm(){
        var vm = this;

        var confirmMsg = this.$t('socialLogPage.deleteMsg')
        vm.$dialog.confirm(confirmMsg)
        .then(function () {
            vm.deleteLogText();
            console.log('Clicked on proceed');

            
        })

    }
    },
    computed:{
        date(){
            return moment(this.logItem.signinDate).format('LLLL');
        },
        minReminderDate(){
            return moment().add(1,"days").format('YYYY-MM-DD');
        },
    }
}
</script>
<style lang="postcss" scoped>
.btn-submit{
    margin-bottom: 10px;
}
.log-item{
    background: white;
    margin-bottom: 20px;  
    min-height:60px;  
    border-radius: 10px;
    padding: 10px 10px 0px 10px;

    border-bottom-style: solid;
    border-bottom-color: #768189;

}
.item-dot-button {
    color: #374b64;
}
.item-body{
    background: #f2f2f2;
    margin: 10px 10px 0px 10px; 
    min-height:60px;  
    border-radius: 10px;
    padding: 10px 10px 0px 10px;
}
.item-type{
    text-align: left;
    display:inline-block;
    color: #ff9045;
}
.item-type-text{
text-decoration: underline;
}
.item-reminder{
    text-align: right;
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
  &:not(:last-child) {
    margin-bottom: 10px;
  }
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
.date-input{
    width: 350px;
}
.item-footer{
    padding-bottom: 0px;
    font-size: 12px;
    margin-top: -15px;
    margin-left: 10px;
    padding-bottom: 5px;
    font-style:italic;
    color: #c2c2d6;
}
.mobile
.tablet{
  .item-dot-button {
    visibility: visible;
    top: 25px;
    right: 15px;
  }
}
</style>
