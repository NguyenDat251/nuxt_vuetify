<template>
  <div>
    <v-app>
      <div>
        <!-- HEADER -->
        <v-toolbar color="primary" :dense="dense">
          <v-toolbar-title>
            <a href="/home">
              <img src="~assets/logo/liena.png" alt="Lien A" height="30" />
            </a>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-img
              :src="require('@/assets/avatar/avatar_male.png')"
              max-width="48"
              max-height="48"
            />
          </v-toolbar-items>
          <v-toolbar-items>
            <v-menu depressed open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Hello, {{user.lastname}} {{user.firstname}}</v-btn>
              </template>

              <v-list>
                <v-list-item
                  @click="$router.push({
                  path: '/user/me/account'
                  });"
                >
                  <v-list-item-title>Account</v-list-item-title>
                </v-list-item>
                <v-list-item @click="toLogout()">
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </v-toolbar>
      </div>

      <!-- SIDE BAR -->
      <v-card height="100%">
        <v-row>
          <v-col cols="2" height="100%">
            <v-card 
              flat 
              height="100%" 
              class="mr-12">
              <v-list>
                <v-list-item to="/delivery" color="primary">
                  <v-list-item-content>
                    <v-list-item-title>Delivery</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/job" color="primary">
                  <v-list-item-content>
                    <v-list-item-title>Job Managerment</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-group no-action value="true">
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>Users</v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item to="/user/manage">
                    <v-list-item-title>List</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/user/role">
                    <v-list-item-title>Role</v-list-item-title>
                  </v-list-item>
                </v-list-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col >
            <v-card flat class="ma-12">
              <v-content>
              <v-container class>
                <!-- Test body  -->
                <!-- <v-button>abc</v-button>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Name</th>
                        <th class="text-left">Calories</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in desserts" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table> -->
                <nuxt/>
              </v-container>
              </v-content>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <!-- </v-row> -->
      <!-- </div> -->
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dense: true,
      flat: true,
      isActive: false,
      user: this.$auth.user,
      item: 5,
      dropdown_items: [
      { text: 'Acount', callback: () => this.$router.push({
        path: '/user/me/account'
      }) },
      { text: 'Logout', callback: () => toLogout()}
    ],


    clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,


    desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  methods: {
    toLogout: function() {
      this.$auth
        .logout()
        .then(function(res) {
          console.log('Log out Result: ')
          console.log(res)
        })
        .catch(function(error) {
          console.log('Error: ' + error)
        })
    }
  },
  created: function() {}
}
</script>
