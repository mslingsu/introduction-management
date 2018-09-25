<template>
<div id="app" class="container">
  <md-dialog-alert :md-content="alert.content" :md-ok-text="alert.ok" @open="onOpen" @close="onClose" ref="subalert">
  </md-dialog-alert>
  <div class="header clearfix">
    <nav>
      <ul class="nav nav-pills pull-right">
        <router-link tag="li" to="/" exact><a>Home</a></router-link>
        <router-link tag="li" v-if="loggedIn" :to="dashlink"><a>Dashboard</a></router-link>
        <router-link tag="li" v-if="loggedIn" to="/change_password"><a>Change Password</a></router-link>
        <router-link tag="li" v-if="loggedIn" to="/logout"><a>Log out</a></router-link>
        <router-link tag="li" v-if="!loggedIn" to="/login"><a>Log in</a></router-link>
        <router-link tag="li" v-if="!loggedIn" to="/signup"><a>Sign Up</a></router-link>
      </ul>
    </nav>
  </div>
  <div class="container">
    <template>
        <router-view></router-view>
      </template>
  </div>

  <footer class="footer">
    <md-input-container md-inline>
      <md-icon>email</md-icon>
      <label>Sign up for emails</label>
      <md-input type="email" v-model="subemail"></md-input>
      <md-button class="md-raised md-dense" @click.native="subscribe()">Subscribe</md-button>
    </md-input-container>
    <p>© 2017 Ling Su</p>
  </footer>
</div>
</template>

<script>
import Config from './config.js'

export default {
  data () {
    return {
      alert: {
        content: 'pending',
        ok: 'pending'
      },
      loggedIn: false,
      profiler: true,
      subemail: null,
      dashlink: '/'
    }
  },
  watch: {
    loggedIn: function (newVal) {}
  },
  mounted () {},
  created () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      if (err) {
        console.error("App: Couldn't get the session:", err, err.stack)
        return
      }
      this.loggedIn = loggedIn
    })
    this.$cognitoAuth.onChange = loggedIn => {
      this.loggedIn = loggedIn
      if (this.loggedIn) {
        var user = this.$cognitoAuth.getCurrentUser()
        if (user) {
          this.dashlink = '/user/' + user.username
        }
      }
    }
  },
  methods: {
    subscribe () {
      var mat = this.subemail.match(/^.+@.+\..+$/)
      if (mat !== null && mat.length > 0) {
        var subURL = Config.BASE_URL + '/subcribe'
        var payload = {
          'email': this.subemail
        }
        var body = JSON.stringify(payload)
        var opts = {
          method: 'POST',
          body: body,
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
        fetch(subURL, opts).then((response) => {
          var data = response.json()
          console.log(data)
          this.alert.content = 'Please confirm your subscription in you email inbox.'
          this.alert.ok = 'Cool!'
          this.openDialog()
        }, function (err) {
          console.error(err)
        })
      }
      this.alert.content = 'Please input a valid email address.'
      this.alert.ok = 'Ok'
      this.openDialog()
    },
    openDialog () {
      this.$refs['subalert'].open()
    },
    closeDialog () {
      this.$refs['subalert'].close()
    },
    onOpen () {
      console.log('Opened')
    },
    onClose (type) {
      console.log('Closed', type)
    }
  }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';




/* Space out content a bit */

body {
  padding-top: 20px;
  padding-bottom: 20px;
}




/* Everything but the jumbotron gets side spacing for mobile first views */

.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}




/* Custom page header */

.header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
}




/* Make the masthead heading the same height as the navigation */

.header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}




/* Custom page footer */

.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}




/* Customize container */

@media (min-width: 768px) {
  .container {
    max-width: 730px;
  }
}

.container-narrow>hr {
  margin: 30px 0;
}




/* Main marketing message and sign up button */

.jumbotron {
  /*text-align: center;*/
  border-bottom: 1px solid #e5e5e5;
}

.jumbotron .btn {
  padding: 14px 24px;
  font-size: 21px;
}




/* Supporting marketing content */

.marketing {
  margin: 10px 0 40px 0;
}

.marketing p+h4 {
  margin-top: 28px;
}




/* Responsive: Portrait tablets and up */

@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}
</style>
