<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">

          <router-link :to="'/'"
            class="btn btn-primary btn-margin">
              Home
          </router-link>

          <button
            class="btn btn-primary btn-margin"
            v-if="!authenticated"
            @click="login()">
              Log In
          </button>

          <button
            class="btn btn-primary btn-margin"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </button>

        </div>
      </div>
    </nav>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view
    :auth="auth"
    :authenticated="authenticated">
  </router-view>
  </div>
</div>
</template>

<script>
import AuthService from './auth/AuthService'

const auth = new AuthService()

const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
