<template>
  <div class="bt-dropdown-container" :class="[{'dropdown-open': open, 'error': error, 'disabled': disabled }, $mq]">
      <div class="dropdown-label" v-if="label">
          <span>{{ label }}</span>
      </div>
      <div tabindex="0"  @focus="handleFocus" @blur="this.handleBlur" class="dropdown-wrapper" v-click-outside="hide">
        <div class="dropdown-button-wrapper">
          <div v-if="disableUpdate" class="dropdown-button" @mousedown="toggle">
            <span v-if="disableUpdate" class="selected-option">{{ title }}</span><svgicon class="arrow-icon" icon="arrow"></svgicon>
          </div>
          <div v-else class="dropdown-button" @mousedown="toggle">
            <span class="selected-option">{{ selectedOption }}</span><svgicon class="arrow-icon" icon="arrow"></svgicon>
          </div>
        </div>
          <transition name="grow">
            <div v-if="open" class="dropdown-selection" ref="dropdown">
                <div
                    ref="dropdownOption"
                    class="dropdown-option"
                    :class="{'highlighted': i === selectedIndex}"
                    :key="option.name"
                    v-for="(option, i) in options"
                    @click="updateSelectedValue(option)"
                >{{option.name}}</div>
            </div>
          </transition>
      </div>
      <div v-show="error" class="error-text">{{ error }}</div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";

export default {
  props: ["label", "options", "value", "error", "disabled", "title","disableUpdate"],
  directives: {
    clickOutside: vClickOutside.directive
  },
  created() {
    const currentOption = this.options.find(
      option => option.value === this.value
    );
    this.selectedOption = currentOption
      ? currentOption.name
      : this.title || this.$t("misc.chooseAnOption");
  },
  data: function() {
    return {
      open: false,
      selectedOption: undefined,
      selectedIndex: -1,
      lastLetter: undefined
    };
  },
  methods: {
    handleBlur() {
      this.lastLetter = undefined;
      this.selectedIndex = -1;
      this.open = false;
      window.removeEventListener("keydown", this.traverseOptions);
    },
  
    handleFocus() {
      if (this.disabled) {
        return;
      }
  
      this.open = true;
      window.addEventListener("keydown", this.traverseOptions);
    },
  
    hide() {
      this.open = false;
    },
  
    scrollToElement(element) {
      const dropdown = this.$refs.dropdown;
      const scrollTop = dropdown.scrollTop;
      const scrollBounds = {
        top: scrollTop,
        bottom: scrollTop + dropdown.clientHeight
      };
      const elementBounds = {
        top: element.offsetTop,
        bottom: element.offsetTop + element.clientHeight
      };
  
      if (elementBounds.top < scrollBounds.top) {
        dropdown.scrollTop = elementBounds.top;
      } else if (elementBounds.bottom > scrollBounds.bottom) {
        dropdown.scrollTop = elementBounds.bottom - dropdown.clientHeight;
      }
    },
  
    show() {
      this.open = true;
    },
  
    toggle() {
      if (this.disabled) {
        return;
      }
  
      this.open = !this.open;
    },
  
    traverseDown() {
      this.selectedIndex++;
  
      if (this.selectedIndex === this.options.length) {
        this.selectedIndex = 0;
      }
  
      this.scrollToElement(this.$refs.dropdownOption[this.selectedIndex]);
    },
  
    traverseLetter(e) {
      const letter = String.fromCharCode(e.keyCode).toLowerCase();
      const options = this.$refs.dropdownOption;
      const element = options.find(option => option.innerHTML.toLowerCase().startsWith(letter));
  
      if (element) {
        e.preventDefault();
        let found = false;
        const start = this.lastLetter === letter ? this.selectedIndex + 1 : 0;
  
        for (let i = start; i < options.length; i++) {
          if (options[i].innerText.toLowerCase().startsWith(letter)) {
            this.selectedIndex = i;
            found = true;
            break;
          }
        }
  
        if (!found) {
          this.selectedIndex = options.findIndex(option => option.innerText.toLowerCase().startsWith(letter));
        }
  
        this.scrollToElement(this.$refs.dropdownOption[this.selectedIndex]);
        this.lastLetter = letter;
      }
    },
  
    traverseOptions(e) {
      switch (e.keyCode) {
        case 32:
        case 13:
          e.preventDefault();
  
          if (this.selectedIndex > -1) {
            this.updateSelectedValue(this.options[this.selectedIndex]);
          }
  
          break;
  
        case 40:
          e.preventDefault();
          this.traverseDown();
          break;
  
        case 38:
          e.preventDefault();
          this.traverseUp();
          break;
  
        default:
          this.traverseLetter(e);
          break;
      }
    },
  
    traverseUp() {
      this.selectedIndex--;
  
      if (this.selectedIndex === -1) {
        this.selectedIndex = this.options.length - 1;
      }
  
      this.scrollToElement(this.$refs.dropdownOption[this.selectedIndex]);
    },
  
    updateSelectedValue(option) {
      if (!this.disableUpdate) {
        this.selectedOption = option.name;
      }
  
      this.$emit("change", option);
      this.handleBlur();
    }
  
  }
};
</script>

<style lang="postcss" scoped>
.white {
  .dropdown-button {
    background: white;
    width: 350px;
  }
}
.large {
  .dropdown-button {
    height: 55px;
    min-width: 350px;
    font-size: 20px;
  }
}

.dropdown-label {
  color: #415770;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 5px;
}
.dropdown-wrapper {
  outline: none;
  position: relative;
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 500;
  color: #14abf4;
}
.dropdown-button-wrapper {
  height: 100%;

  background: white;
  border-radius: 5px;
  transition: border-radius 0.2s;
  transition-delay: 0s;
}
.dropdown-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: 100%;
  border-radius: 5px;
  border: solid 2px #cadeea;
  padding: 10px 15px;
  background: white;
}
.selected-option {
  margin-right: 10px;
  white-space: nowrap;
}
.arrow-icon {
  width: 20px;
  height: 20px;
  fill: #14abf4;
  transition: transform 0.2s;
}
.dropdown-open {
  .arrow-icon {
    transform: rotate(180deg);
  }
  .dropdown-button {
    background: #e7f5fe;
    border: solid 2px #14abf4;
  }
  .dropdown-button-wrapper {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    transition: border-radius 0s;
    transition-delay: 0s;
  }
}
.dropdown-selection {
  z-index: 1;
  font-weight: normal;
  color: #415770;
  position: absolute;
  left: 0;
  overflow-y: auto;
  max-height: 250px;
  width: 100%;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background: white;
  padding: 10px 0;
  box-shadow: 0px 12px 54px -4px rgba(194, 194, 194, 1);
}
.dropdown-option {
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background: #e7f5fe;
  }
}
.highlighted {
  background: #e7f5fe;
}
.error {
  .dropdown-button {
    background: #fff8f8;
    border-color: #ffbaba;
    color: #ff7878;
  }

  .arrow-icon {
    fill: #ff7878;
  }
}

.error-text {
  font-size: 14px;
  color: #ff7878;
  font-weight: 500;
}

.grow-enter-active,
.grow-leave-active {
  transition: max-height 0.2s, padding 0.2s;
}
.grow-enter,
.grow-leave-to {
  max-height: 0;
  padding: 0;
}
.mobile {
  .dropdown-wrapper {
    height: 40px;
    font-size: 13px;
  }
  .dropdown-label {
    font-size: 13px;
  }
  .large {
    .dropdown-button {
      height: 40px;
      font-size: 16px;
    }
  }
}
</style>
