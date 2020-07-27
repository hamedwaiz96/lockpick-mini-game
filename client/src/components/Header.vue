<template>
  <div class="header-con">
    <router-link to="/register">Sign Up</router-link>
    <router-link to="/login">Login</router-link>
    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
// import Authentication from '../services/Authentication'

export default Vue.extend({
  name: 'Header',
  methods: {
    logout () {
      // Authentication.logout()
      //   .then(() => {
      //     router.push('/')
      //   })
      axios
        .get('/api/logout')
        .then(() => {
          router.push('/')
        })
    }
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
