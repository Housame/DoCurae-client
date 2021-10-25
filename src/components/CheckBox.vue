<template>
<div :class="{'disabled':disabled}">
    <label v-on:click="clicked" class="bt-check-box" >
    <div v-bind:class="{'cb-border': true, 'cb-checked': checked}" ></div>
       <div class="label label-text has-text-docurae" v-if="icon"><slot><i class="far fa-bell"></i>  {{label}}</slot></div>
       <!-- <div class="label label-text has-text-docurae" v-if="icon && !iconOn"><slot><i class="far fa-bell"></i>  {{label}}</slot></div> -->
       <!-- <div class="label label-text has-text-docurae" v-else-if="icon && iconOn"><slot><i class="far fa-bell-slash"></i>  {{label}}</slot></div> -->
       <div class="label label-text has-text-docurae" v-else><slot>{{label}}</slot></div>
  </label>
</div>
</template>

<script>
export default {
  name: "check-box",
  props:["disabled","checked","label","icon","iconOn"],
  data() {
    return {
      selected: true
    };
  },
  watch: {
    checked: function(value) {
      this.selected = value;
    }
  },
  mounted: function() {
    this.selected = this.checked;
  },
  model: {
    prop: "checked",
    event: "change"
  },

  methods: {
    clicked: function() {
      if(!this.disabled){
        this.selected = !this.selected;
        this.$emit("change", this.selected);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.disabled {
  .bt-check-box{
    pointer-events: none;
  }
  .cb-checked::after {
  stroke: #fff;
  content: url(../../src/assets/svg/check.svg);
  position: absolute;
  width: 20px;
  height: 20px;
  left: -2px;
  top: -2px;
  background-color: #bababa;
  padding: 5px;
  border-radius: 3px;
 }
 .cb-border {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #edf0f2;
  border-radius: 3px;
  user-select: none;
 }
}
.bt-check-box {
  cursor: pointer;
}
.cb-border {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid #cadeea;
  border-radius: 3px;
  user-select: none;
}
.cb-checked::after {
  stroke: #fff;
  content: url(../../src/assets/svg/check.svg);
  position: absolute;
  width: 20px;
  height: 20px;
  left: -2px;
  top: -2px;
  background-color: #14abf4;
  padding: 5px;
  border-radius: 3px;
}
.label-text {
  display: inline-block;
  position: relative;
  top: -4px;
  left: 8px;
}
.mobile {
  .label-text {
    font-size: 13px
  }
}
</style>