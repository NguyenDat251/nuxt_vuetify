<template>
  <section class="section">

    <h1 class="blue-grey--text text--lighten-1 display-2 bold">User</h1>
    <v-btn class="text-center my-6" color="primary" to="manage/add">Add new user</v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Username</th>
            <th class="text-left">First Name</th>
            <th class="text-left">Last Name</th>
            <th class="text-left">Telephone</th>
            <th class="text-left">Role</th>
            <th class="text-left">Join Date</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data" :key="user.id"  @click="clickItem(user)">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.telephone }}</td>
            <td>{{ user.role_id }}</td>
            <td>{{ user.created_at }}</td>
            <td>{{ user.description }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    getUserList: function() {
      this.$axios
         //.get(this.$api('api.routes.user.users.list'))
        .get('/users')
        .then(response => {
          response.data.users.forEach(obj => {
            this.data.push(obj);
            
          })
        })
        .catch(function(error) {
          console.log('Error')
          console.trace(error);
        })
    },
    clickItem: function(e) {
      this.$router.push({
        path: '/user/manage/edit/' + e.id
      })
    }
  },
  created: function() {
    this.getUserList()
  }
}
</script>

