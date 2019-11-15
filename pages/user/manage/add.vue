<template>
  <section class="section">
    <v-container>
      <h1 class="blue-grey--text text--lighten-1 display-2 bold">Add a user</h1>
<v-form
      ref="form"
      lazy-validation
    >
      <v-card flat>
        <v-col cols="8">
          <!-- text field from username to telephone -->
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

          <v-card 
            class="d-flex justify-space-between"
            flat>
            <v-btn depressed color="primary" @click="addUser">Add</v-btn>
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
          label: 'Password',
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

      username: '',
      password: '',
      lastname: '',
      firstname: '',
      telephone: '',
      role_id: null,
      roles: [],
      description: '',
      isActive: false,
      isLoading: false,
      shape:true
      // rules: {
      //   name: [val => (val || '').length > 0 || 'This field is required'],
      // },
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1)
    },
    addUser: function(e) {
      if ( this.$refs.form.validate()) {
      console.log("username_click:" + this.fields[0]["value"]);


      //console.log("username_click:" + this.description);
      
      let $this = this;
      this.isLoading = true;
      this.$axios
        //.post(this.$api('api.routes.user.create'), {
        .post(('/user'),{
          username: this.fields[0]["value"],
          password: this.fields[1]["value"],
          lastname: this.fields[2]["value"],
          firstname: this.fields[3]["value"],
          telephone: this.fields[4]["value"],
          role_id: this.role_id,
          description: this.description
        })
        .then(res => {
          console.log("res: " + res);
          console.log('Response')
          console.log(res.data);
          $this.goBack();
          this.isLoading = false
        })
        .catch(function(error) {
          //handle error
          console.log('Error: ')
          console.log(error.response.data)
          this.isLoading = false
        })

      e.preventDefault()
    }
    }
  },
  created: function() {
    let $this = this
    this.$axios
      //.get(this.$api('api.routes.user_role.roles.list'))
      .get('/userroles')
      .then(response => {
        $this.roles = response.data.roles
        console.log("role: " + this.roles)
      })
      .catch(function(error) {
        //handle error
        console.log('Error: ')
        console.log(error.response.data)
      })
  }
  
}
</script>