<template>
    <div :class="`${lowerCaseAuthType}-con`">
        <h1>{{ AuthType }}</h1>
        <form @submit.prevent="handleSubmit">
            <label>
                Username
                <input type="text" placeholder="Username" name="username">
            </label>
            <label>
                Password
                <input type="password" placeholder="Password" name="password">
            </label>
            <button>{{ AuthType }}</button>
        </form>
    </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Authentication from '../services/Authentication'
import router from '../router/index'

export default Vue.extend({
  name: 'AuthenticationForm',
  props: {
    AuthType: String
  },
  computed: {
    lowerCaseAuthType () {
      return this.AuthType.toLowerCase()
    }
  },
  methods: {
    handleSubmit () {
      const inputs = document.querySelectorAll('input')
      const formData = {}
      inputs.forEach((el) => {
        formData[el.name] = el.value
      })
      if (this.AuthType === 'Register') {
        Authentication.register(formData)
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)
            router.push('/')
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        Authentication.login(formData)
          .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)
            router.push('/')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
})
</script>
