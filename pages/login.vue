<template>
  <!-- <v-container fluid> -->
  <v-row>
    <v-col cols="12">
      <v-row justify="center">
        <v-col cols="4">
          <v-card outlined>
            <v-col cols="12">
              <h1 class="logo mb-12">Liên Á Manager</h1>
              <v-alert :value="errorMessage != null" class="mb-12" type="warning"><span>{{errorMessage}}</span></v-alert>

              <v-form ref="form" @submit.prevent="logIn">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="username"
                        :rules="rules.name"
                        color="primary"
                        label="Username"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="password"
                        :rules="rules.name"
                        color="primary"
                        label="Password"
                        required
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12">
                      <v-textarea v-model="form.bio" color="teal">
                        <template v-slot:label>
                          <div>
                            Bio
                            <small>(optional)</small>
                          </div>
                        </template>
                      </v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="form.favoriteAnimal"
                        :items="animals"
                        :rules="rules.animal"
                        color="pink"
                        label="Favorite animal"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-slider
                        v-model="form.age"
                        :rules="rules.age"
                        color="orange"
                        label="Age"
                        hint="Be honest"
                        min="1"
                        max="100"
                        thumb-label
                      ></v-slider>
                    </v-col>
                    <v-col cols="12">
                      <v-checkbox v-model="form.terms" color="green">
                        <template v-slot:label>
                          <div @click.stop>
                            Do you accept the
                            <a href="javascript:;" @click.stop="terms = true">terms</a>
                            and
                            <a
                              href="javascript:;"
                              @click.stop="conditions = true"
                            >conditions?</a>
                          </div>
                        </template>
                      </v-checkbox>
                    </v-col> -->
                  </v-row>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :loading="btnLoginLoading" depressed color="primary" type="submit">login</v-btn>
                  <!-- <v-btn :loading="btnLoginLoading" text color="primary" type="logIn">Register</v-btn> -->
                </v-card-actions>
              </v-form>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>

<style scoped>
.logo {
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  background-color: #0d1d42;
  padding: 24px;
  color: white;
}
</style>

<script>

const MESSAGE_NO_INPUT = 'Xin Vui Lòng Nhập Username và Mật Khẩu'

export default {
  components: {
  },
  layout: 'login',
  data() {
    return {
      username: null,
      password: null,
      errorMessage: null,
      btnLoginLoading: false,
      rules: {
        name: [val => (val || '').length > 0 || 'This field is required'],
      },
    }
  },
  methods: {
    submit(){
      this.errorMessage = '123';
    },
    async setToken(response) {
      //await this.$auth.setToken('local', "Bearer " + response.data.token);
      // await this.$auth.setRefreshToken('local', response.data.refresh);
      await this.$auth.setUserToken(response.data.token)
    },
    closeMessage: function() {
      this.errorMessage = null
    },
    async logIn() {
      let $this = this;
      
      if (
        !this.username ||
        this.username == '' ||
        !this.password ||
        this.password == ''
      ) {
        this.errorMessage = MESSAGE_NO_INPUT
        console.log('Error: ' + MESSAGE_NO_INPUT)
        return
      }

      /*
        this.$auth
          .loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          })
          .then(response => {
            console.log(this.$auth);
            console.log("After login: " + this.$auth.user);
          })
          .catch(function(error) {
            console.log('Error: ' + error);
          })
        */
      //this.$refs['btn-login'].loading = true;
      this.btnLoginLoading = true;

      this.$axios.post('user/login', {
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          if (response.data.result === false) {
            $this.errorMessage = response.data.error.msg
            console.log('Error: ')
            console.log(response.data.error)
          } else {
            $this.setToken(response)
            // console.log(this.$store.state.auth.loggedIn);
          }

          $this.btnLoginLoading = false;
        }).catch(function(response) {
          //handle error
          console.log('Error: ')
          console.log(response)
          $this.btnLoginLoading = false;
        })
    }
  },
  created: function() {
    console.log('User:')
    //console.log(this.$auth.user)
  }
}
</script>
