<template>
  <div :class="[$mq, {'error': error, 'disabled': disabled, 'inner-label': innerLabel}]" class="bt-input-container">
      <label :for="name" v-if="label" class="input-label"><span>{{ label }}</span><span class="sub-label" v-if="subLabel">{{subLabel}}</span></label>
      <div class="input-container">
        <div class="input-wrapper">
          <div class="field is-grouped">
            <p class="control is-expanded" :class="{'has-icons-right': hasIcon}">

          <input
            :id="name"
            ref="input"
            :class="{'loading': loading}"
            :type="type || 'text'"
            :placeholder="placeholder || ''"
            :value="value"
            @input="updateText()"
            :disabled="disabled"
            @keyup.enter="enter2"
            @blur="handleBlur"
            autocomplete="false"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            :readonly="readonly"
          />
          <span v-if="hasIcon" class="icon is-right">
             <svgicon :icon="icon" width="28" height="28" color="#14abf4"></svgicon>
          </span>

        </p>
        </div>
          <bt-moon-loader class="far-right" :loading="!!loading && loading" color="#415770" :size="'30px'" />
          <div class="inner-label far-right" v-if="innerLabel">{{innerLabel}}</div>
        </div>
      </div>
        <span v-show="error" class="error-text">{{ error }}</span>
  </div>
</template>

<script>
import MoonLoader from "vue-spinner/src/MoonLoader";
// import '@/compiled-icons';

export default {
  props: ["name", "label", "subLabel", "type", "placeholder", "value", "error", "loading", "innerLabel", "decimalInput", "disabled", "readonly", "enter", "icon","articleNrCheck","focus"],
  components: {
    "bt-moon-loader": MoonLoader
  },
  methods: {
    updateText() {
      if(this.decimalInput === true){
        this.$refs.input.value=this.$refs.input.value.replace(',', '.');
        var value =  this.$refs.input.value;
      } 
      this.$emit("input", this.$refs.input.value);
    },
    handleBlur(){
      // console.log("blur");
      if(this.articleNrCheck){
        //  console.log("blur && check");
        this.$emit("validateArticleNr", true);
      }
    },
    dummy() {
    }
  },
  mounted() {
    if(this.focus){
      this.$refs.input.focus();
    }
  },
    computed:{
      hasIcon () {
          return this.icon != null && this.icon != "";
      },
      enter2() {
        if (this.enter == undefined) return this.dummy;
        return this.enter;
      }
  },

};
</script>

<style lang="postcss" scoped>
.icon {
     margin-top: 7px;
     margin-right: 8px;
}
.field:not(:last-child) {
    margin-bottom: 0;
}
.disabled {
  input{
    cursor: default;
    border: none;
    background-color:#f7f9fb;
    color: #bababa;
  }
}
.bt-input-container {
  font-size: 16px;
  font-weight: 500;

  &.inner-label {
    input {
      padding-right: 50px;
      color: #14abf4;
    }
  }
}
.input-label {
  color: #415770;
  font-weight: 500;
  margin-bottom: 5px;
  display:inline-block;
}
.input-wrapper {
  position: relative;
}
.far-right {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
input {
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: solid 2px #cadeea;
  font-weight: 500;
  font-size: 16px;
  padding: 10px 15px;
  color: #415770;
  outline: none;
  font-family: 'Hammersmith One', sans-serif;

  &.loading {
    padding-right: 40px;
  }

  &::placeholder {
    color: rgba(65,87,112, 0.3);
  }
}

.error-text {
  font-size: 14px;
  color: #ff7878;
  font-weight: 500;
  margin-top: 0px;
}

.error {
  input {
    background: #fff8f8;
    border-color: #ffbaba;
    color: #ff7878;
  }
}

.inner-label, .sub-label {
  color:#9ba5b1;
}

.mobile {
  &.bt-input-container {
    font-size: 13px;
  }
  input {
    font-size: 13px;
    height: 40px;
  }
  .error-text {
    font-size: 12px;
  }
  .icon {
     margin-top: 4px;
     margin-right: 8px;
}

}
</style>
