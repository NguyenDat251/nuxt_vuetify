<template>
  <section class="section">

    <h1 class="blue-grey--text text--lighten-1 display-2 bold">Roles</h1>
    <v-btn class="text-center my-6" color="primary" to="role/add">Add a new role</v-btn>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">Display Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in data" :key="role.id"  @click="clickItem(role)" >
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td>{{ role.display_name }}</td>
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
    getRoleList: function(){
      let $this = this;
      this.$axios
      //.get(this.$api('api.routes.user_role.roles.list'))
      .get('/userroles')
      .then(response => {
        $this.data = response.data.roles;
      }).catch(function(error){
        console.log("Error:");
        console.log(error);
      });
    },
    clickItem: function(e) {
      this.$router.push({
        path: '/user/role/edit/' + e.id
      })
    }
  },
  created: function() {
    this.getRoleList()
  }
}
</script>

