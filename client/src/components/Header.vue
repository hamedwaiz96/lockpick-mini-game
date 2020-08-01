<template>
  <div class="header-con">
    <div v-if="this.user === ''">
      <router-link to="/register">Sign Up</router-link>
      <router-link to="/login">Login</router-link>
    </div>
    <button v-if="this.user !== ''" v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import Vue from 'vue'
import router from '../router/index'
import Authentication from '../services/Authentication'

export default Vue.extend({
  name: 'Header',
  data () {
    return {
      user: ''
    }
  },
  methods: {
    logout () {
      Authentication.logout()
        .then(() => {
          localStorage.removeItem('jwt')
          localStorage.removeItem('user')
          router.push('/')
        })
    },
    getUserData: function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      if (localStorage.getItem('jwt') !== null) {
        self.$set(this, 'user', localStorage.getItem('user'))
      }
    }
  },
  mounted () {
    this.getUserData()
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
