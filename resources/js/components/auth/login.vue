<template>
 <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-toolbar class="pt-5 blue darken-4">
                <v-toolbar-title class="white--text"><h4>Facturation</h4></v-toolbar-title>
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                      <v-form v-model="valid" ref="form">
                        <v-text-field
                          label="Entrez votre adresse email"
                          v-model="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          label="Entrez votre mot de passe"
                          v-model="password"
                          min="8"
                          :append-icon="e1 ? 'visibility' : 'visibility_off'"
                          @click:append="() => (e1 = !e1)"
                          :type="e1 ? 'text' : 'password'"
                          :rules="passwordRules"
                          counter
                          required
                        ></v-text-field>
                        <v-layout justify-space-between>
                            <v-btn @click="submitLogin" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Login</v-btn>
                            <a href="">Mot de passe oublié</a>
                        </v-layout>
                      </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>
</template>

<script>
  export default {
    data() {
      return {
        email: null,
        password: null,
        loginError: false,
         passwordRules: [
              (v) => !!v || 'Password is required',
            ],
         emailRules: [
              (v) => !!v || 'E-mail is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
           valid: false,
            e1: false,
      }
    },

    mounted() {
      //
    },

    methods: {
      submitLogin() {
          this.loginError = false
          if (this.$refs.form.validate()) {
              let param ={
              loginfo:{
                  email : this.email,
                password : this.password
              },
              router:this.$router

          }
          this.valid=false
          this.$store.dispatch("login",param)
          }




      }
    }
  }
</script>
