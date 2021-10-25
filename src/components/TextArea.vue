<template>
  <div :class="[$mq, {'error': error, 'disabled':disabled, 'inner-label': innerLabel}]" class="bt-textarea-container">
      <div v-if="label" class="textarea-label">{{ label }}</div>
      <div class="textarea-container">
        <div class="textarea-wrapper">
          <textarea
            ref="textarea"
            :style="{ height: getHeight() }"
            :class="{'loading': loading}"
            :type="type || 'text'"
            :placeholder="placeholder || ''"
            :value="value"
            @input="updateText()"
            :disabled="disabled"
          />
          <bt-moon-loader class="far-right" :loading="!!loading && loading" color="#415770" :size="'30px'" />
          <div class="inner-label far-right" v-if="innerLabel">{{innerLabel}}</div>
        </div>
        <span v-show="error" class="error-text">{{ error }}</span>
      </div>
  </div>
</template>

<script>
import MoonLoader from "vue-spinner/src/MoonLoader";

export default {
  props: ["label", "type", "placeholder", "value", "error", "loading", "innerLabel", "height","disabled"],
  components: {
    "bt-moon-loader": MoonLoader
  },
  methods: {
    updateText() {
      this.$emit("input", this.$refs.textarea.value);
    },
    getHeight() {
      return (this.height || 150) + 'px';
    }
  }
};
</script>

<style lang="postcss" scoped>
.disabled {
  textarea{
    cursor: default;
    border: none;
    background-color:#f7f9fb;   
    color: #bababa;
  }
}
.bt-textarea-container {
  font-size: 16px;

  &.inner-label {
    textarea {
      padding-right: 50px;
      color: #14abf4;
    }
  }
}
.textarea-label {
  color: #415770;
  font-weight: 500;
  margin-bottom: 5px;
}
.textarea-wrapper {
  position: relative;
}
.far-right {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}
textarea {
  resize: none;
  width: 500px;
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
}

.error {
  textarea {
    background: #fff8f8;
    border-color: #ffbaba;
    color: #ff7878;
  }
}

.inner-label {
  color:#9ba5b1;
}

.mobile {
  &.bt-textarea-container {
    font-size: 13px;
  }
  textarea {
    font-size: 13px;
    height: 40px;
  }
  .error-text {
    font-size: 12px;
  }
}
</style>
