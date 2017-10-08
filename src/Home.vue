<template>
    <div class="container">
      <div class="row marketing">
        <h2>Welcome</h2>
        <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
        <p>This site is Ling Su's Demo project for providing an example of using AWS and Vue.js</p>
        <p>To give it a try:</p>
        <ol>
          <li>Signup using your email address, this will send through an activation code.</li>
          <li>Once you get the activation code enter it with your email address.</li>
          <li>Sign in with your credentials.</li>
          <li>You should now be able to navigate to the dashboard and build or see your resume.</li>
          <li>With direct URL, you can also view your own or other user's resume without login.</li>
        </ol>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loggedIn: false
    }
  },
  created: function () {
    this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      console.log('Home login check', err, loggedIn)
      if (err) {
        console.err("Home: Couldn't get the session:", err, err.stack)
        return
      }
      this.loggedIn = loggedIn
    })
  }
}
</script>
