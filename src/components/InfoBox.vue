<template>
  <div class="bt-info-box">
    <div class="info-icon-container">
    <svgicon
        icon="info" 
        :style="{width: 24, height: 24}" color="white">
    </svgicon>
    </div>
    <span class="info-container-text">{{text}}</span>
  </div>
</template>

<script>
export default {
  props: ["text"]
}
</script>

<style lang="postcss" scoped>
.bt-info-box {
  border-radius: 4px;
  background-color: #e7f5fe;
  border: solid 2px #14abf4;
  color: #14abf4;
  display: flex;
  padding: 15px;
  align-items: center;
}
.info-icon-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #14abf4;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.info-container-text {
  font-weight: 500;
  flex: 1;
}

.mobile {
  .bt-info-box {
    padding: 10px
  }
  .info-icon-container {
    width: 34px;
    height: 34px;
  }
}
</style>
