<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import router from '../router/index'
import Authentication from '../services/Authentication'

export default {
  name: 'Home',
  data () {
    return {
      user: {
        username: 'Default',
        password: 'Default',
        level: 'Novice',
        exp: 0,
        unlocks: 0,
        money: 0,
        lockpicks: 0,
        profilePicUrl: 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
      }
    }
  },
  methods: {
    getUserData: function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      Authentication.user()
        .then((response) => {
          self.$set(self, 'user', response.data.user)
        })
        .catch((errors) => {
          console.log(errors)
          router.push('/')
        })
    }
  },
  mounted () {
    this.getUserData()
  }
}
</script>
