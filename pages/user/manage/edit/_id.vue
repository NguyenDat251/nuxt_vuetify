<template>
  <section class="section">
    <v-container>
      <h1 class="blue-grey--text text--lighten-1 display-2 bold">{{fields[0]["value"]}}</h1>
      <v-form ref="form" lazy-validation>
        <v-card flat>
          <v-col cols="8">

            <!-- Delete button and dialog -->
            <v-row>
              <v-spacer></v-spacer>
              <v-dialog 
                v-model="dialog" 
                width="500px">
                <template 
                    v-slot:activator="{ on }">
                  <v-btn 
                    color="primary" 
                    v-on="on">
                    Delete user
                    </v-btn>
                </template>
                <v-card>
                  <v-card-text class="title d-flex justify-center align-center pa-4">
                      Are you sure you want to delete this user?
                     </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions color="#f5f5f5">
                    <v-spacer></v-spacer>
                    <v-btn color="white" @click="dialog = false">Cancel</v-btn>
                    <v-btn color="primary" @click="onClickConfirm">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>


            <textFieldWithLabel
              v-for="j in fields"
              :key="j.label"
              :label="j.label"
              :value="j.value"
              :isRuleUsed="j.isRuleUsed"
              @onChangeTextField="j.value=$event"
            ></textFieldWithLabel>

            <!-- dropdown select role -->
            <h5>Roles</h5>
            <v-overflow-btn
              v-model="role_id"
              :items="roles"
              item-text="display_name"
              item-value="id"
              placeholder="Select a role"
              dense
              outlined
            ></v-overflow-btn>

            <h5>Description</h5>
            <v-textarea outlined v-model="description"></v-textarea>

            <v-card class="d-flex justify-space-between" flat>
              <v-btn depressed color="primary" @click="edit">Edit</v-btn>
              <v-btn depressed color="grey lighten-3" @click="goBack">Back</v-btn>
            </v-card>
          </v-col>
        </v-card>
      </v-form>
    </v-container>
  </section>
</template>

<script>
import textFieldWithLabel from '@/components/text-field-with-label.vue'
import { async } from 'q';

export default {
  components: {
    textFieldWithLabel
  },
    data() {
    return {
      fields:[
        {
          label: 'Username',
          value: '',
          isRuleUsed: true
        },
        {
          label: 'Last name',
          value: '',
          isRuleUsed: true
        },
        {
          label: 'First name',
          value: '',
          isRuleUsed: true
        },
        {
          label: 'Telephone',
          value: '',
          isRuleUsed: false
        }
      ],
    
    user_id:'',
      role_id: null,
      roles: [],
      description: '',
      isActive: false,
      isLoading: false,
      dialog:false
    }
  },
  methods: {
    goBack: function() {
      this.$router.push('/user/manage')
    },
    getUser: function() {
      console.log('User Id: ')
      console.log(this.$route.params.id)
      this.user_id = this.$route.params.id
      let $this = this
      this.isLoading = true
      //const url = this.$api('api.routes.user.read') + this.user_id
      const url = "/user/" + this.user_id

      this.$axios
        .get(url)
        .then(response => {
          let user = response.data.user

          $this.fields[0]["value"] = user.username
          $this.fields[1]["value"] = user.lastname
          $this.fields[2]["value"] = user.firstname
          $this.fields[3]["value"] = user.telephone
          $this.description = user.description
          $this.role_id = user.role_id

          this.$axios
            //.get($this.$api('api.routes.user_role.roles.list'))
            .get('userroles')
            .then(response => {
              $this.roles = response.data.roles
              if (!$this.roles) {
                return
              }
              $this.isLoading = false
            })
            .catch(function(error) {
              //handle error
              $this.isLoading = false
              console.log('Error: ')
              console.log(error)
            })
        })
        .catch(function(error) {
          //handle error
          $this.isLoading = false
          console.log('Error: ')
          console.log(error)
        })
    },
    edit: function(e) {
      let $this = this
      this.isLoading = true
      this.$axios
        //.put(this.$api('api.routes.user.update'), {
        .put('user', {    
          user_id: $this.user_id,
          username: $this.fields[0]["value"],
          firstname: $this.fields[1]["value"],
          lastname: $this.fields[2]["value"],
          telephone: $this.fields[3]["value"],
          role_id: $this.role_id,
          description: $this.description
        })
        .then(res => {
          console.log('Response')
          console.log(res)
          $this.goBack()
          $this.isLoading = false
        })
        .catch(function(error) {
          //handle error
          console.log('Error: ')
          console.log(error)
          $this.isLoading = false
        })
      e.preventDefault()
    },
    onClickConfirm: function() {
      console.log('Delete User ID IS: ' + this.user_id)
      this.$axios.delete('user', {
        data: {
          id: this.user_id
        }
      })
      this.goBack()
    }
  },
  created: function() {
    this.getUser()
  }
  
}
</script>