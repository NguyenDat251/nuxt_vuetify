import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: '5000'
  },

  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  '@nuxtjs/auth'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */

  /*change the primary color*/
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      //dark: true,
      themes: {
        light: {
          primary: '#0d1d42'
        }
      }
    }
  },
  axios: {
    baseURL: 'http://localhost:8000',
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { 
            url: 'user/login', 
            method: 'post', 
            propertyName: 'token' 
          },
          user: { 
            url: 'user/me', 
            method: 'get', 
            propertyName: 'user' 
          },
          logout: {
            url: 'user/logout', 
            method: 'post',
          }
        },
        tokenRequired: true,
        tokenName: 'x-access-token',
        tokenType: '',
        
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/home'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
