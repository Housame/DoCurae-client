<template>
      <div style="height: 100%;display: flex;flex-direction: column;justify-content: center;">
          <div class="login-window" style="border-radius:5px;display: flex;margin: auto;box-shadow: 0px 0px 60px 20px rgba(0, 0, 0, 0.1);">
            <div class="login-logo-window has-text-centered" style="display: flex;flex-direction: column;justify-content: center;background-color: #415770;">
                <div>
                    <img src="../../assets/care-ico150X150.png" style="margin: auto;"><br>
                    <img src="../../assets/Docurae-text.png" style="margin: auto;">   
                    <!-- <h1 class="is-size-4 has-text-weight-semibold" style="color: #ffffff">docurae</h1> -->
                </div>
            </div>
            <div class="login-form-window" style="background-color: #ffffff;">
                <form @submit.prevent="onSubmit">
                    <p class="is-heading">{{$t('home_page.login')}}</p>
                    <bt-input type="text" icon="mail" :readonly="Loading" :label="$t('home_page.userName')" v-model="login.UserName" v-validate="'required'" name="username" :error="errors.first('username')"  style="margin-top: 60px;"/>
                    <bt-input type="password" icon="lock" :readonly="Loading" :label="$t('home_page.password')" v-model="login.Password" v-validate="'required'" name="password" :error="errors.first('password')"  style="margin-top: 15px;"/>
                    <!-- <div class="field" style="margin-top: 10px;">
                        <check-box v-model="login.RememberMe">{{$t('home_page.rememberMe')}}</check-box>  
                    </div> -->

                    <div class="field is-grouped" style="margin-top: 20px;margin-bottom: 40px;">
                        <div class="control">
                            <b-button variant="success" size="lg" v-on:click="onSubmit">{{$t('home_page.submit')}}</b-button>
                            <!-- <button v-on:click="onSubmit">{{$t('home_page.submit')}}</button> -->
                        </div>
                        <div class="control">
                            <button v-on:click.prevent="goForgot()" class="button is-large is-white" style="padding-left: 10px;">{{$t('home_page.forgotPwd')}}</button>
                        </div>
                    </div>
                    <!-- <message-box v-if="ErrorMessage != ''" style="margin-top: 10px;margin-bottom: 10px;">{{ErrorMessage}}</message-box> -->
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Input from "@/components/Input"


export default {
    name: 'login',
    components:{
    "bt-input":Input
    },
    data () {
        return {
            login: {
                UserName: "",
                Password: "",
                RememberMe: false,
            },
            ErrorMessage: "",
            Loading: false
        }
    },
    created: function () {
        const dictionary = {
            en: {
                messages:{
                    required: (atr) => atr + ' saknas',
                    email: () => 'Ange en giltlig e-postadress'
                },
                attributes: {
                    username: 'E-postadress',
                    password: 'Lösenord'
                }
            }
        };
     //  Validator.localize(dictionary);
    },
    methods: {
    onSubmit: function() {
        console.log(this.$store.state.menu.isLoggedIn);
        this.$store.dispatch('setLoggedIn', true);
        console.log(this.$store.state.menu.isLoggedIn);
        console.log("Login in",this.login)
        // this.$validator.validateAll().then((result) => {
        //     this.ErrorMessage = "";
        //     if (result) {
        //         this.Loading = true;

        //         this.$store.dispatch("auth/login", this.login)
        //         .then( () => {
        //                   this.$cookie.set('username',this.login.UserName,30);
        //             return this.$store.dispatch("settings/getSettings", this.login)
        //             .then( () => {
        //                 this.Loading = false;
        //                 this.$router.push('/');
        //                 this.$store.commit("menu/setLoggedIn",true);
        //             })
        //         }).catch( error => {
        //             if (!error.response)
        //             {
        //                 this.ErrorMessage = "Ingen kontakt med servern";
        //             }
        //             else {
        //                 var status = error.response.status;
        //                 this.ErrorMessage = "Felaktig inloggning " + status;
        //             }
        //             this.Loading = false;
        //         })
        //     }
        //     else {
        //        this.ErrorMessage = "";
        //     }
        // })

    },
    goForgot: function() {
            alert("hej");
    }
  },
  mounted () {
    var username = this.$cookie.get('username'); 
    if (username !== null && username !== "") {
        this.login.UserName = username;
        document.getElementById("password").focus();
    }
    else {
        document.getElementById("username").focus();
    }
    window.addEventListener("load", function() { window.scrollTo(0, 0); });
  }
}
</script>

<style scoped>
@media screen and (min-width: 1200px) {
    .login-window {
        width: 900px;
        flex-direction: row;
    }
    .login-logo-window {
        width: 450px;
        height: 600px;
        border-radius:5px 0 0 5px;
    }
    .login-form-window {
        width: 450px;
        height: 600px;
        border-radius:0 5px 5px 0;
    }
    .login-form-window form {
        margin: 50px;
    }
}
@media screen and (max-width: 1199px) {
    .login-window {
        width: 335px;
        flex-direction: column;
    }
    .login-logo-window {
        width: 335px;
        height: 168px;
        border-radius:5px 5px 0 0;
    }
    .login-form-window {
        width: 335px;
        min-height: 362px;
        border-radius:0 0 5px 5px;
    }
    .login-form-window form {
        margin: 16px;
    }

}
</style>

