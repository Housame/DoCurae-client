<template>
  <div class="container-b" :class="$mq" @touchmove="(event) => event.stopPropagation()" @click="clickApp">
    <!-- <bt-inactive></bt-inactive> -->

    <!-- <bt-modal v-if="$store.state.modal.modalActive" :component="modalComponent" :props="modalProps" /> -->
    <div v-if="isLoggedIn">
        <!-- <transition name="mobile-menu">
          <bt-mobile-menu v-if="open" />
        </transition> -->
        <!-- <transition name="mobile-menu-backdrop">
          <div class="mobile-menu-backdrop" v-if="open" @click="closeMobileMenu"></div>
        </transition> -->
      <!-- <div v-if="$mq === 'desktop'" style="display: flex;"> -->
      <div class="akagami-utils" style="display: flex;">
        <select v-model="$i18n.locale" @change="changeLocale">
          <option value="en">EN</option>
          <option value="se">SE</option>
        </select>
        <p style="margin-left: 10px;" class="has-text-black">{{now}}</p>
        <!-- <p style="margin-left: 10px;" class="has-text-black">Token:{{Math.floor(token/60)}} minuter {{Math.floor(token%60)}} sekunder</p>
        <p style="margin-left: 10px;" class="has-text-black">Loggas ut om:{{Math.floor(logOutTime/60)}} minuter {{Math.floor(logOutTime%60)}} sekunder</p> -->
      </div>
      <div class="columns-b" style="margin-bottom: 0;">
        <div class="column-b">
          <menu-top></menu-top>
          <!-- <bt-tablet-menu v-if="$mq === 'laptop'" /> -->
        </div>
      </div>

      <div class="columns-b">
        <div v-if="$mq === 'desktop'" class="menu-b" style="min-width: 300px;width: 300px;">
          <menu-left></menu-left>
        </div>
        <div class="router-container column-b s-9">
          <router-view :key="$route.fullPath" class="router"></router-view>
        </div>
      </div>
    </div>
    <div v-if="!isLoggedIn" :style="{'background-image': 'url(' + require('./assets/img/bg01.jpg') + ')', 'position': 'relative','background-size': 'cover', 'background-attachment': 'fixed', 'background-position': 'center center','height':'100%'}">
      <login></login>
    </div>
  <div class="blur" style="display: none">
    <span class="centerscreen">spinner</span>
  </div>
  </div>
</template>

<script>
import MenuLeft from "./components/menus/menu-left/MenuLeft";
import MenuTop from "./components/menus/menu-top/MenuTop";
import Login from "./pages/home/Login";
// import Inactive from "./pages/account/inactive";
// import MobileMenu from "./components/menus/mobile-menu/MobileMenu";
// import TabletMenu from "./components/menus/tablet-menu/TabletMenu";
// import Modal from "./components/Modal";
import moment from "moment";
import "moment/locale/se";

export default {
  name: "app",
  components: {
    MenuLeft,
    MenuTop,
    Login,
    // "bt-inactive": Inactive,
    // "bt-mobile-menu": MobileMenu,
    // "bt-tablet-menu": TabletMenu,
    // "bt-modal": Modal
  },
  data: function() {
    return {
      language: this.$i18n.locale
    };
  },
//   timers: {
//         expiration: { time: 1000, repeat: true, autostart: true}
//   },
  methods: {
    changeLocale: function() {
      if (this.$i18n.locale === "se") {
        moment.locale("sv");
      } else {
        moment.locale(this.$i18n.locale);
      }
      this.$router.push("/");
    },
    // closeMobileMenu() {
    //   this.$store.commit("menu/setMobileMenuActive", false);
    // },
    clickApp() {
    //    this.$store.dispatch("auth/reportActivity");
    },
    //  expiration () {
    //   this.$timer.stop('expiration');
    //   this.timers.expiration.time = 1000;
    //   this.$timer.start('expiration');
    //   this.$store.dispatch("auth/oneSecondTick");
    // },
  },
  computed: {
    // isAuth() {
    //   return this.$store.state.auth.isAuthenticated;
    //   //this.$auth.isAuthenticated()
    // },
    isLoggedIn() {
      return this.$store.state.menu.isLoggedIn;
      //this.$auth.isAuthenticated()
    },
    now() {
      return this.$moment().format("YYYY-MM-DD HH:mm");
    },
    // token() {
    //   return this.$store.state.auth.tokenLife;
    // },
    // logOutTime() {
    //   return this.$store.state.auth.secondsLeft;
    // },
    // open() {
    //   return this.$store.state.menu.mobileMenuActive;
    // },
    // modalComponent() {
    //   return this.$store.state.modal.component;
    // },
    // modalProps() {
    //   // console.log(this.$store.state.modal)
    //   return this.$store.state.modal.props;
    //}
  },
  created() {
    this.axios
    .get(`client/settings`)
    .then(response=>{
      console.log("settings",response.data);
      this.$store.dispatch("setSettings",response.data)
    })

    if (this.$i18n.locale === "se") {
      moment.locale("sv");
    } else {
      moment.locale(this.$i18n.locale);
    }
  }
};
</script>

<style lang="postcss">

 @import url('https://fonts.googleapis.com/css?family=Hammersmith+One');

body {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  color: #415770;
  font-family: 'Hammersmith One', sans-serif;
}

html {
  background: #f5f6f8;
}

header {
  &.blue {
    font-size: 20px;
    color: #14abf4;
    font-weight: bold;
  }
}

.mobile {
  header.blue {
    font-size: 16px;
  }
}

.akagami-utils{
  max-height:20px;
}

.container-background {
  padding: 20px;
  background: white;
  border-radius: 4px;
  margin-top: 20px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.04);
}

.mobile {
  .container-background {
    padding: 15px;
    max-width: 100%;
  }
}

.dashed-background {
  background: white;
  border-radius: 4px;
  border: dashed 2px #cadeea;
  padding: 20px;
}

.cancel-button {
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
}

.tablet {
  .cancel-button {
    font-size: 16px;
  }
}

.mobile {
  .cancel-button {
    font-size: 13px;
  }
}

.mobile {
  .dashed-background {
    padding: 10px;
  }
}

.bt-content-container-low {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.04);
}

.bt-shadow-high {
  box-shadow: 0px 12px 54px -4px rgba(194, 194, 194, 1);
}
.page-header {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.page-header-title {
  font-size: 35px;
  font-weight: bold;
}
input {
  font-size: 16px;
}
.mobile {
  font-size: 13px;
  .router-container {
    padding: 10px;
  }

  input {
    font-size: 13px;
  }
  .page-header-title {
    font-size: 25px;
    margin-top: 0;
  }
}

@media screen and (min-width: 1200px) {
  .menu-b {
    display: flex;
  }
  .button.is-large {
    font-family: 'Hammersmith One', sans-serif;
    font-weight: 600;
    font-size: 18px;
    border-radius: 4px;
    height: 54px;
    padding-left: 3em;
    padding-right: 3em;
  }
  .is-heading {
    font-weight: 600 !important;
    font-size: 1.25rem !important;
  }
  .is-label {
    font-weight: 600 !important;
    font-size: 1rem !important;
    display: block;
    margin-bottom: 0.2em;
  }
}
@media screen and (max-width: 1199px) {
  .button.is-large {
    font-family: 'Hammersmith One', sans-serif;
    font-weight: 500;
    font-size: 0.9em;
    border-radius: 4px;
    height: 36px;
    padding-left: 2em;
    padding-right: 2em;
  }
  .is-heading {
    font-weight: 500 !important;
    font-size: 1.2rem !important;
  }
  .is-label {
    font-weight: 600 !important;
    font-size: 1rem !important;
    display: block;
    margin-bottom: 0.3em;
  }
}
.column-c-b {
  margin-left: 10px;
  margin-right: 10px;
}
.container-b {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.columns-b {
  display: flex;
  flex-direction: row;
}
.column-b {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.button.is-docurae {
  background-color: #374b64;
  border-color: transparent;
  color: #fff;
}
.button.is-success {
  background-color: #63c07e;
  border-color: transparent;
  color: #fff;
}
.button.is-complementary {
  background-color: #ff7878;
  border-color: transparent;
  color: #fff;
}
.has-text-docurae {
  color: #374b64 !important;
}
.has-text-docurae-accent {
  color: #ff9292 !important;
}

.has-text-docurae-gray {
  color: #9ba5b1 !important;
}

.has-text-docurae-light {
  color: #14abf4 !important;
}
.input,
.textarea {
   font-family: 'Hammersmith One', sans-serif, 'light';
  font-weight: 400;
  font-size: 12px;
 -webkit-box-shadow: inset 0 0 0 rgba(10, 10, 10, 0.1);
  box-shadow: inset 0 0 0 rgba(10, 10, 10, 0.1);
}
.input.is-active,
.input.is-focused,
.input:active,
.input:focus,
.textarea.is-active,
.textarea.is-focused,
.textarea:active,
.textarea:focus {
  border-color: #34b2e0;
  -webkit-box-shadow: 0 0 0 0;
  box-shadow: 0 0 0 0;
}
.label {
  font-weight: 500;
}

.button.is-success.is-hovered,
.button.is-success:hover {
  background-color: #549e6a;
  border-color: transparent;
  color: #fff;
}
.button.is-success.is-focused:not(:active),
.button.is-success:focus:not(:active) {
  -webkit-box-shadow: 0 0 0 0;
  box-shadow: 0 0 0 0;
}
.button.is-focused:not(:active),
.button:focus:not(:active) {
  -webkit-box-shadow: 0 0 0 0;
  box-shadow: 0 0 0 0;
}
.button.is-white.is-hovered,
.button.is-white:hover {
  background-color: #ffffff;
  border-color: transparent;
  color: #415770;
}
.button.is-white {
  background-color: #fff;
  border-color: transparent;
  color: #415770;
}
.centerscreen {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999999;
}
.blur {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(235, 235, 235);
  opacity: 0.5;
  z-index: 95000;
  position: fixed;
}

#app {
}
[v-cloak] {
  display: none;
}
body {
  height: 100vh;
  font-family: 'Hammersmith One', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #374b64;
}
.router-container {
  background: #f5f6f8;
  padding: 20px;
  min-height: calc(100vh - 80px);
}
.router {
  margin: 0 auto;
  max-width: 1150px;
  width: 100%;
}

.mobile-menu-backdrop {
  z-index: 9998;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform 0.2s;
}

.mobile-menu-enter,
.mobile-menu-leave-to {
  transform: translateX(-100%);
}

.mobile-menu-enter-to,
.mobile-menu-leave {
  transform: translateX(0);
}

.mobile-menu-backdrop-enter-active,
.mobile-menu-backdrop-leave-active {
  transition: opacity 0.2s;
}

.mobile-menu-backdrop-enter,
.mobile-menu-backdrop-leave-to {
  opacity: 0;
}

.mobile-menu-backdrop-enter-to,
.mobile-menu-backdrop-leave {
  opacity: 1;
}

.tablet,
.mobile {
  .router-container {
    padding-top: 60px;
  }
}
</style>
