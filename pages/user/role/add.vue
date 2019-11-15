<template>
  <section class="section">
    <v-container>
      <h1 class="blue-grey--text text--lighten-1 display-2 bold">Add a user</h1>
      <v-form ref="form" lazy-validation>
        <v-card flat>
          <v-col cols="8">
            <!-- text fields -->
            <textFieldWithLabel
              v-for="j in fields"
              :key="j.label"
              :label="j.label"
              :value="j.value"
              :isRuleUsed="j.isRuleUsed"
              @onChangeTextField="j.value=$event"
            ></textFieldWithLabel>

            <v-card class="d-flex justify-space-between" flat>
              <v-btn depressed color="primary" @click="addRole">Add</v-btn>
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
          label: 'System Name',
          value: '',
          isRuleUsed: true
        },
        {
          label: 'Display Name',
          value: '',
          isRuleUsed: true
        }
      ],

      isActive: false,
      isLoading: false,
      shape:true
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1)
    },
    getRole: function() {
      this.user_id = this.$route.params.id
      let $this = this
      this.isLoading = true
      //const url = this.$api('api.routes.user.read') + this.user_id
      const url = "/userrole/" + this.user_id

      this.$axios
        .get(url)
        .then(response => {
          let user = response.data.user

          $this.fields[0]["value"] = user.name
          $this.fields[1]["value"] = user.display_name
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
        .put(this.$api('api.routes.user_role.update'), {
          id: $this.id,
          name: $this.name,
          display_name: $this.display_name
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
    askToDelete: function() {
      let $this = this
      this.$buefy.dialog.confirm({
        message: 'Are you sure you want to delete this role?',
        onConfirm: () => {
          console.log('Delete Role ID: ' + $this.id)
          $this.$axios
            .delete($this.$api('api.routes.user_role.delete'), {
              data: {
                id: $this.id
              }
            })
            .then(response => {
              $this.goBack()
            })
            .catch(function(error) {
              //handle error
              console.log('Error: ')
              console.log(error)
            })
        }
      })
    }
  },
  created: function() {
    this.id = this.$route.params.id
    let url = this.$api('api.routes.user_role.read') + this.id;

    this.$axios
      .get(url)
      .then(response => {
        this.name = response.data.role.name
        this.display_name = response.data.role.display_name
      })
      .catch(function(error) {
        //handle error
        console.log('Error: ')
        console.log(error)
      })
  }
  
}
</script>