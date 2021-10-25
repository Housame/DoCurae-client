<template>
    <div class="bt-filter" :class="{'dropdown-open': open }" v-click-outside="hide">
      <div @click="toggle" class="filter-button-container">
        <div class="filter-button-inner-container">
          <span class="filter-label">{{label}}</span>
          <div class="chosen-filter">
            <div>
              <div class="filter-dot"></div>
            </div>
            <span class="longest-hidden">{{longestValue}}</span>
            <span class="chosen-value" >{{chosenValue}}</span>
          </div>
        </div>
        <bt-icon-item class="filter-arrow" iconname="arrow" :iconcolor="arrowColor" size="25" />
      </div>
      <transition name="filter-dropdown">
        <div v-show="open" class="filter-dropdown">
          <div :ref="option.name" :key="option.name" v-for="(option, i) in options" class="filter-option" @click="select(i)">
            <span>{{option.name}}</span>
            <bt-colored-radio-button :checked="selectedIndex === i" />
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import IconItem from "./IconItem";
import ColoredRadioButton from "./ColoredRadioButton";
import moment from "moment";

export default {
  props: ["label", "options", "onSelect", "selectedIndex", "dateRange", "setCustomDate", "useCustom","mode"],
  components: {
    "bt-icon-item": IconItem,
    "bt-colored-radio-button": ColoredRadioButton,
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  created(){
  },
  data: function() {
    return {
      open: false,
      width: 0,
      customDate:undefined
    };
  },
  methods: {
    select(i) {
      // this.customDate = undefined
      if (this.setCustomDate) {
        this.setCustomDate(undefined)
      }
      this.onSelect(i);
      this.hide();
    },
    hide() {
      this.open = false;
    },
    toggle() {
      this.open = !this.open;
    },
  },
  computed: {
    longestValue() {
      const values = [];
      values.push(this.options.reduce(
        (acc, curr) => (curr.name.length > acc.length ? curr.name : acc),
        ""
      ));      
      return values.reduce(
        (acc, curr) => (curr.length > acc.length ? curr : acc),
        ""
      )
    },
    arrowColor() {
      return this.open ? "bolblue" : "#9ba5b1";
    },
    chosenValue() {
        return this.options[this.selectedIndex].name;
    },
    iconColor() {
      return this.open ? "#ff7878" : "#9ba5b1";
    }
  }
};
</script>

<style lang="postcss" scoped>
.bt-filter {
  font-weight: 500;
  position: relative;
}

.filter-button-container {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.filter-button-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 36px;
  height: 36px;
  padding: 15px;
  padding-right: 0;
  background: #e8e9ed;
  transition: background 0.2s;
}

.filter-label {
  color: #9ba5b1;
}

.chosen-filter {
  position: relative;
  padding: 10px;
  padding-right: 20px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 36px;
  height: 36px;
  transition: color 0.2s;
}

.chosen-value {
  position: absolute;
  left: 30px;
}

.longest-hidden {
  white-space: nowrap;
  visibility: hidden;
}

.filter-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #9ba5b1;
  margin-right: 10px;
  transition: background 0.2s;
}

.filter-arrow {
  margin-left: 5px;
  transition: transform 0.2s;
}

.dropdown-open {
  .filter-label {
    color: white;
  }
  .chosen-filter {
    background: none;
    color: white;
  }
  .filter-arrow {
    transform: rotate(180deg);
  }
  .filter-button-inner-container {
    background: #415770;
  }
  .filter-dot {
    background: #ff7878;
  }
}

.filter-dropdown {
  background: #415770;
  border-radius: 5px;
  color: white;
  padding: 10px 0;
  position: absolute;
  right: 0;
  left: 0;
  z-index: 100;
  top: calc(100% + 5px);
  max-height: 250px;
  overflow-y: auto;
}

.filter-option {
  padding: 5px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.date-picker {
  .chosen-value {
    left: 40px;
  }
}

.filter-dropdown-enter-active,
.filter-dropdown-leave-active {
  transition: max-height 0.2s, padding-top 0.2s, padding-bottom 0.2s,
    opacity 0.4s;
}

.filter-dropdown-enter,
.filter-dropdown-leave-to {
  max-height: 0;
  padding-bottom: 0;
  padding-top: 0;
  overflow-y: hidden;
  opacity: 0;
}

.mobile {
  .bt-filter {
    font-size: 13px;
  }
  .chosen-filter {
    margin-left: 0;
  }
}
</style>

