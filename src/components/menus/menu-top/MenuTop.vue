<template>
  <div class="top-menu-container">
    <div class="home-logo" v-if="$mq !== 'mobile' && $mq !== 'tablet'" @click="resetRouterOrder">
      <router-link class="home-logo-link" to="/"><img src="@/assets/icons/test.png"></router-link>
    </div>
    <div class="client-selector-container" >
    </div>
    <div class="alerts-container top-menu-button" @click="alert" >
        <!-- <bt-icon-item iconcolor="white" iconname="notification" :standard="true" /><span v-if="getLayerCount > 0" class="layer-container">{{getLayerCount}}</span> -->
        <img src="@/assets/icons/email-open.png" >
    </div>
    <div class="logout-container top-menu-button" @click="logoff" >
        <!-- <bt-icon-item iconcolor="white" iconname="logout" :standard="true" /> -->
        <img src="@/assets/icons/logout.png" >
    </div>
  </div>
</template>

<script>

export default {
  name: "menu-top",
  computed:{


  },
  methods: {
    resetRouterOrder(){
      this.$store.dispatch('resetRouterOrder');
    },
    logoff() {
      this.$store.dispatch("resetLoggedIn");
    },
    alert() {
      alert('Du har ej slutfört 10 mail');
    }
  }
};
</script>

<style lang="postcss" scoped>

.top-menu-container {
  background-color: #415770;
  display: flex;
  flex-direction: row;
  height: 80px;
}
.home-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  width: 300px;
  background-color: #374b64;
  height: 80px;
  align-items: center;
}
.home-logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
}
.client-selector-container {
  margin-left: auto;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.top-search {
  margin-left: 20px;
  height: 100%;
}

.top-menu-button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-left-color: #5e7085;
  border-left-width: 1px;
  border-left-style: solid;
}

.laptop {
  .home-logo {
    width: 80px;
    min-width: 80px;
  }
}

.tablet,
.mobile {
  .top-menu-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 1000;
  }
  .top-menu-button {
    height: 60px;
    width: 60px;
  }
}

.mobile {
  .top-search {
    margin-left: 10px;
  }
}
</style>
