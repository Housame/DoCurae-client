<template>

    <div class="container"> 
        <div class="header">
            <h1>{{$t('misc.socialLogBook')}}</h1>
            <div class="fancy">
                <span>{{getMainSection}} - {{getPatientName}} - {{getPatientSSN}} </span>
            </div>
        </div>
        <div class="main-container" v-if="logObj">
            <div class="utils-container">

                <button v-if="!addLog" class="btn btn-primary" @click="addLog=!addLog">
                    <i class="fas fa-plus-circle"></i>
                    {{$t('socialLogPage.addLog')}}
                </button>
            </div>
            <div v-if="addLog" class="add-log-conatiner">
                <div class="edit-property-row single-input">
                    <ct-dropdown v-if="logObj" class="property-input" :label="$t('socialLogPage.chooseType')" :options="logTypeOptions"
                       :value="logObj.logTextType" @change="setLogType" 
                     />
                        <!-- v-validate="'required'" 
                        :name="$t('addReceiptPage.payer')" :error="errors.first($t('addReceiptPage.payer'))"-->
                </div>
                <div class="edit-property-row single-input">
                    <ct-check-box 
                        :label="$t('socialLogPage.changeDate')"
                        :checked="logObj.differentDate"
                        @change="setCustomDate"
                    />
                </div>
                <div  class="edit-date-row date-input" v-if="logObj.differentDate">
                    <ctk-date-time-picker
                        v-model="logObj.customDate"
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
                        v-model="logObj.logText"
                    />
                        <!-- v-validate="'required|max:150|min:3'"
                        :name="$t('addReceiptPage.purpose')" :error="errors.first($t('addReceiptPage.purpose'))" -->
                </div>
                <div class="edit-property-row single-input">
                    <ct-check-box 
                        :label="getReminderLabel"
                        :checked="logObj.reminded"
                        @change="setReminderDate"
                        :icon="true"
                        :iconOn="logObj.reminded"
                    />
                </div>
                <div class="edit-date-row date-input" v-if="logObj.reminded">
                    <div class="reminder-section">
                        <label class="input-label"><span>{{ $t('socialLogPage.reminderDateLabel') }}</span></label>
                        <ctk-date-time-picker
                            class="date-input"
                            v-model="logObj.reminderDate"
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
                <div v-if="logObj.type" class="edit-property-row single-input">
                    <ct-info-box :text="testInfoText"/>
                </div>
                <div class="edit-property-row single-input">
                    <button class="btn btn-success" @click="submitLog">Signera och skicka in <i class="fas fa-arrow-alt-circle-right"></i></button>
                    <button class="btn btn-warning"  @click="addLog=!addLog">{{$t('misc.cancel')}}  <i class="far fa-times-circle"></i></button>
                </div>
            </div>
            <div class="log-container" :class="{'blur-all':addLog}" >
                <div class="line-div"></div>
                <div >
                    <ct-log-item 
                        v-for="item in logTexts" 
                        :key="item.id" 
                        :logItem="item"
                        @reload="getLogTexts"
                    />
                </div>
                
            </div>
            
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
import LogItem from './SocialLogItemBox'

export default {
    components:{
        "ct-dropdown":DropDown,
        "ct-info-box":InfoBox,
        "ct-text-area":TextArea,
        "ct-check-box":CheckBox,
        "ctk-date-time-picker": VueCtkDateTimePicker,
        "ct-log-item":LogItem
    },
    created(){
        this.getLogTexts();
        // this.setLogin();   
        // console.log(this.getPatientName) ;
        // console.log(this.getPatientId) ;
        
    },
    watch:{
      patientChange : function(val){
          console.log("val",val)
        //   console.log("reload")
        //   if(this.patientChange)
        this.getLogTexts();
      }
    },
    data(){
        return{
            addLog:false,
            logTexts:undefined,
            patientChange:false,
            logTypeOptions:[
                {name:"Genomförandeplan",value:1},
                {name:"Veckosammanfattning",value:2},
                {name:"Kommunikation",value:3},
                {name:"Matvanor och kost",value:4},
                {name:"Sömn",value:5},
                {name:"Personlig omvårdnad",value:6},
                {name:"Stämningsläge",value:7},
                {name:"Fall",value:8},
                {name:"Aktivitet",value:9},
                {name:"Klagomål",value:10},
                {name:"Kontakt med sjuksjöterska",value:11},
                {name:"kontakt med närstående",value:12},
                {name:"kontakt med bistånshandläggare",value:13},
            ],
            logObj:{
                patientId:undefined,
                logTextType:undefined,
                logText:undefined,
                differentDate:false,
                customDate:undefined,
                reminderDate:undefined,
                logTextTypeId:undefined,
                reminded:false
            },
            testInfoText:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu metus at ex elementum efficitur. Donec in turpis eu dolor gravida mattis sed quis orci. Proin erat lacus, aliquam vel nunc non, pulvinar cursus tortor. Sed nulla quam, consequat ac enim ac, cursus ultrices elit. Ut libero purus, accumsan ac nisl at, elementum vehicula ex."
        };
    },
    computed:{
        getReminderLabel(){
            return (!this.logObj.reminded)?this.$t('socialLogPage.setReminderDate'):this.$t('socialLogPage.unsetReminderDate')
        },
        maxCustomDate(){
            return moment().add(1,"days").format("YYYY-MM-DD");
        },
        minCustomDate(){
            return moment().subtract(7, "days").format('YYYY-MM-DD');
        },
        minReminderDate(){
            return moment().add(1,"days").format('YYYY-MM-DD');
        },
        getMainSection() {
            // console.log(this.$store.state.patient.patientSection);
            return this.$store.state.patient.patientSectionName;
        },
    
        getPatientName() {
            // console.log(this.$store.state.patient.patientName);
            this.patientChange = !this.patientChange;
            console.log(this.patientChange);
            return this.$store.state.patient.patientName;
        },

        getPatientId() {
            console.log(this.$store.state.patient.patientId);
            // this.patientChange = !this.patientChange;
            // console.log(this.patientChange);
            return this.$store.state.patient.patientId;
        },
    
        getPatientSectionName() {
            // console.log(this.$store.state.patient.patientSection);
            return this.$store.state.patient.patientSectionName;
        },
        getPatientSSN(){
            // console.log(this.$store.state.patient.patientSSN);
            return this.$store.state.patient.patientSSN;
        }
    
    },
    methods:{
        // setLogin(){
        //     this.axios
        //     .get(`client/login`)
        //     .then(response=>{
        //         console.log(response.data);
        //     })
        // },
        setCustomDate(){
            this.logObj.differentDate = !this.logObj.differentDate;
            if(!this.logObj.differentDate){
                this.logObj.customDate = undefined;
            }
        },
        setReminderDate(){
            this.logObj.reminded = !this.logObj.reminded;
            if(!this.logObj.reminded){
                this.logObj.reminderDate = undefined;
            }
        },
        getLogTexts(){
            this.axios
            .get(`client/logtext/${this.getPatientId}`)
            .then(response=>{
                console.log(response.data)
                this.logTexts = response.data;
            })
        },
        setLogType(option){
            this.logObj.logTextType = option.name;
            this.logObj.logTextTypeId = option.value;
        },
        // reload(){
        //     this.$forceUpdate();
        // },
        submitLog(){
            console.log("hello world",this.logObj);
            this.logObj.patientId = this.getPatientId;
            this.axios
            .post(`client/logtext/${this.getPatientId}`,this.logObj)
            .then(resposen=>{
                this.addLog = !this.addLog;
                this.getLogTexts();
            });
        }
    }
    
}
</script>
<style lang="postcss" scoped>
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
.add-log-conatiner{
    background: white;
    width: 80vh;
    padding: 25px;
    padding-left: 60px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
    margin-left: 50px
}
.log-container{
    margin-top: 40px;

}
.line-div{
    border-top: double;
    margin-bottom: 10px;
}
.blur-all{
    filter: blur(1.5px);
}
.fancy {
  margin-top: 20px;
  margin-bottom: 40px;
  line-height: 0.5;
  text-align: center;
}
.fancy span {
  display: inline-block;
  position: relative;  
}
.fancy span:before,
.fancy span:after {
  content: "";
  position: absolute;
  height: 5px;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  top: 0;
  width: 300px;
}
.fancy span:before {
  right: 100%;
  margin-right: 15px;
}
.fancy span:after {
  left: 100%;
  margin-left: 15px;
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
.dimm{

}
</style>

