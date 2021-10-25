<template>
<div class="dots-container">
  <span @click="onDotsClick" :class="{'dropdown-open': showDropdown}" id="dots">&#9679;&#9679;&#9679;</span>
  <transition name="dot-menu">
    <div
      @click="(event) => event.stopPropagation()"
      v-click-outside="hide"
      v-if="showDropdown"
      @mouseleave="hide"
      class="dropdown-container"
    >
      <div v-if="header" class="dropdown-header">{{header}}</div>
      <div v-else class="dropdown-header">{{$t('misc.chooseAnOption')}}</div>
      <span @click="onDotsClick" class="dropdown-dots">&#9679;&#9679;&#9679;</span>
      <div
        class="dropdown-option"
        :key="option.label"
        v-for="option in options"
        @click="option.onClick"
      >
        {{option.label}}
      </div>
      <slot></slot>
    </div>
  </transition>
</div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  props:["options","toggleDropdown","header"],
  data: function() {
    return {
      showDropdown: false
    };
  },
  watch:{
    toggleDropdown: function(val){
      if(this.toggleDropdown){
        // this.hide();
        this.showDropdown = false;
      }
    }
  },
  methods: {
    toggle() {
      this.showDropdown = !this.showDropdown;
    },
    show() {
      this.showDropdown = true;
    },
    hide() {
      this.showDropdown = false;
    },
    onDotsClick(event) {
      this.$emit('toggle');
      event.stopPropagation();
      this.toggle();
    }
  }
};
</script>

<style lang="postcss" scoped>
.dots-container {
  position: relative;
  z-index: 1;
}
.dropdown-open {
  color: white;
}
.dropdown-container {
  cursor: default;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 240px;
  text-align: left;
  padding: 15px;
  background: #3a4e66;
  border-radius: 5px;
  color: white;
  div:not(:last-child) {
    margin-bottom: 10px;
  }
}
.dropdown-header {
  font-weight: bold;
}
.dropdown-option {
  cursor: pointer;
    color: white;
  &:hover {
    color: #f9be57 !important;
  }
}
#dots {
  font-size: 10px;
  width: 28px;
  cursor: pointer;
  padding: 10px;
  padding-right: 0;
}
.dropdown-dots {
  cursor: pointer;
  color: white;
  font-size: 10px;
  position: absolute;
  top: 6px;
  right: 10px;
}

.dot-menu-enter-active,
.dot-menu-leave-active {
  transition: opacity 0.2s;
}

.dot-menu-enter,
.dot-menu-leave {
  opacity: 0;
}
</style>
