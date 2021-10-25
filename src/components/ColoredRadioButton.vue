<template>
  <div class="radio-button">
      <div v-if="checked" class="radio-button-check">
        <div class="dot"></div>
      </div>
      <div v-else class="radio-button-uncheck"></div>
    </div>
</template>

<script>
export default {
  props: ["checked"]
};
</script>

<style lang="postcss" scoped>
.radio-button-check {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ff7878;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
}

.radio-button-uncheck {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}
</style>