<template>
<div class="bt-menu-left">
    <div class="menu-container">
      <div class="choice-container" v-if="getRouterOrder !== 1">
        <multi-drop-down 
           class="patient-filter"
          :label="$t('misc.section')"
          :options="getSectionOptions"
          :selected-index="sectionIndex"
          :on-select="sectionSelect"
        />
        <multi-drop-down 
           class="patient-filter"
          :label="$t('misc.patient')"
          :options="patientOptions"
          :selected-index="patientIndex"
          :on-select="patientSelect"
          v-if="sectionName"
        />
        <div  class="test">
          <span v-if="getMainSection" class="test">{{getMainSection}}</span>
          <span v-if="getPatientName">  - {{getPatientName}}</span>
        </div>

      </div>
      <div class="link-group-container">
        <!-- <div class="link-container" :key="route.path" v-for="route in routes.filter(filterRoles)"> -->
          <!-- <span>{{currentPath}}</span> -->
        <div class="link-container" :key="route.path" v-for="route in routes">

          <router-link exact :to="route.path" tag="div" class="menu-link router-link">
            <div class="link-text" @click="() => toggleMenu(route)">
              {{$t('menu.'+route.meta.label)}}
            </div>
          </router-link>

          <!-- <div
            @click="() => toggleMenu(route)"
            :to="route.path"
            tag="div" 
          >
          </div> -->
        </div>
        <div class="link-container">
            <div v-if="getRouterOrder > 1" class="link-text"  @click="() => resetMenu()">
            <!-- <div class="link-text"  @click="() => resetMenu()"> -->
            backa
            </div>
        </div>
      </div>
    </div>
    <div ref="logoContainer" class="logo-container">
        <img src="@/assets/care-ico115X115.png">
        <h1>DoCurae</h1>
        <!-- <p>073-77 81 619</p> -->
        <!-- <p>hej@docurae.se</p> -->
    </div>
</div>
</template>

<script>
import vClickOutside from "v-click-outside";
import MultiDropdwon from "@/components/MultiDropDown"

export default {
  name: "menu-left",
  components:{
    "multi-drop-down":MultiDropdwon
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  computed: {
    getRouterOrder(){
      // console.log(this.$store.state.menu.routerOrder);
      return this.$store.state.menu.routerOrder;
    },
    getPatientName(){
      // console.log(this.$store.state.patient.patientName);
      return this.$store.state.patient.patientName || 'inget';
    },
    getPatientSectionName(){
      // console.log(this.$store.state.patient.patientSectionName);
      return this.$store.state.patient.patientSectionName;
    },
    getMainSection(){
      // console.log(this.$store.state.patient.mainSection);
      return this.$store.state.patient.mainSection;
    },
    getSectionOptions(){
      var test =  this.$store.getters.settings.sections.map(section=>({
        name:section.name,
        value:section.id
      }))
      // console.log("Omar",test)
      return test;
    },
  },
  data() {
    return {
      mainParent: undefined,
      parent: undefined,
      patientIndex: "0",
      patientName:undefined,
      patientOptions: [],
      patientName: undefined,
      patientValue:undefined,
      routes: undefined,
      sectionIndex: "0",
      sectionOptions: [],
      sectionName: undefined
    };
  },
  created() {
    this.sectionOptions =  this.getSectionList();

    this.getRoutes();
    // this.patientName

  },
  watch:{
    getRouterOrder: function(val){
      this.getRoutes();
    }
  },
  methods: {
    getPatientsList(){
      var filtreredSection =  this.$store.getters.settings.sections
        .filter(section=> section.id === this.sectionId);
        filtreredSection = filtreredSection[0].patients
        .map(patient=>({
          name:patient.firstName + " " + patient.lastName,
          value:patient.id
        }));
        
        return filtreredSection;
    },
    getSectionList(){
      return this.$store.getters.settings.sections.map(section=>({
        name:section.name,
        value:section.id
      }))
    },
    patientSelect(index){
      this.patientIndex = index;
      this.patientName = this.patientOptions[index].name;
      this.patientValue = this.patientOptions[index].value;
      // console.log(this.patientName);
      this.$store.dispatch('setPatientName', this.patientName);
      this.$store.dispatch('setPatientId', this.patientValue);
      this.$store.dispatch('setPatientSSN', this.patientOptions[index].ssn);
    },
    sectionSelect(index){
      this.sectionIndex = index;
      this.sectionName = this.sectionOptions[index].name;
      this.sectionId = this.sectionOptions[index].value;
      // console.log("section select",this.sectionName,this.sectionId)
      this.$store.dispatch('setPatientSectionName', this.sectionName);
      this.$store.dispatch('setPatientSectionId', this.sectionId);
      this.$store.dispatch('setMainSection', this.sectionName);
      this.patientOptions = this.getPatientsList();
    },
    resetMenu(){
      this.$store.dispatch('setRouterOrder', this.getRouterOrder - 1);
      if(this.getRouterOrder === 3 || this.getRouterOrder === 2){
        this.$router.go('-1');
      }
      
      this.getRoutes();
    },
    getRoutes(){
      if(this.getRouterOrder !== 1){
        // console.log("into",this.parent);
        this.routes = this.$router.options.routes
        .filter(route => 
                    (this.getRouterOrder === 3 && route.meta.order === this.getRouterOrder && route.meta.parent === this.parent) 
                      ||  
                    (this.getRouterOrder === 2 && route.meta.order === this.getRouterOrder && route.meta.parent === this.mainParent)
            )
        .map(route => ({
          ...route
        }));
      }
      else{
        this.routes = this.$router.options.routes
        .filter(route => route.meta.order === this.getRouterOrder)
        .map(route => ({
          ...route
        }));
        this.$router.push('/');
      }

    },
    getChildRoutes(parentRoute) {
      return this.childRoutes.filter(
        route => route.meta.parent === parentRoute.name
      );
    },
    toggleMenu(route){
      // console.log("hej",route.meta);
      // console.log("before",this.getRouterOrder);
      if(this.getRouterOrder === 1){
        this.mainParent = route.meta.label;
      }
      else if(this.getRouterOrder === 2){
        this.parent = route.meta.label;
      }
      if(route.meta.root){
        this.$store.dispatch('setRouterOrder', this.getRouterOrder + 1);
      }

      
      // console.log("after",this.getRouterOrder);
      // this.getRoutes();
    }
  }
};
</script>
<style lang="postcss" scoped>
/* base */
.test{
  margin-top: 10px;
  font-style: normal;
  font-weight: 700;
}
.patient-filter {

  margin-top: 10px; 
}
.choice-container{
  margin-left: 10px;
  max-width: 90vh;
}
.bt-menu-left {
  width: 100%;
  background: white;
}
.link-group-container {
  padding-top: 40px;
}
.link-container {
  padding: 10px;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 700;
  &:first-child {
    padding-top: 0;
  }
}
.label-route-payment{
  margin-right: 110px;
}
.label-route-withdrawls-sv{
  margin-right: 158px;
}
.label-route-withdrawls-en{
  margin-right: 94px;
}
.menu-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.router-link-active {
  color: #ff7878;
  >>>path {
    fill: #ff7878 !important;
  }
}

.logo-container {
  justify-content: center;
  align-items: center;
  display: flex;
  position: fixed;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  width: 200px;
  left: 10px;

  img {
    margin: 0 auto;
    margin-bottom: 20px;
  }
  h1 {
    font-size: 24px;
    font-weight: 700;
  }

  p {
    color: #9ba5b1;
    font-size: 16px;
  }
}
.tablet
.mobile{
  .patient-filter{
    margin: 0;
    margin-top: 20px;
  }
}
</style>