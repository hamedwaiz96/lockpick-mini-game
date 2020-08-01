<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <canvas id="canvas"></canvas>
    <div v-if="this.user !== ''">
        <div>
            <h3>Difficulty: {{this.game.lockpick.difficulty}}</h3>
            <h3>Lockpicks: {{this.user.lockpicks}}</h3>
            <h3>Money: {{this.user.money}}</h3>
        </div>
        <h3>
            <span class="received-num"></span>
        </h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '../router/index'
import Authentication from '../services/Authentication'
import Game from '../services/game'

export default {
  name: 'Home',
  data () {
    return {
      user: '',
      game: ''
    }
  },
  methods: {
    getUserData: function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      if (localStorage.getItem('jwt') !== null) {
        self.$set(this, 'user', JSON.parse(localStorage.getItem('user')))
        console.log(this.user.lockpicks)
        const game = new Game(this.user)
        self.$set(this, 'game', game)
      }
    }
  },
  mounted () {
    this.getUserData()
  }
}
</script>
