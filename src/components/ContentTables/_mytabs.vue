<template>
<md-tabs md-centered>
  <md-tab md-label="Welcome" md-icon="home">
    <div v-if="admin">
      <md-input-container>
        <label>Headline</label>
        <md-input v-model="headline"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Summary</label>
        <md-textarea v-model="summary"></md-textarea>
      </md-input-container>
      <md-button class="md-raised md-accent" @click.native="onSave">
        <md-icon>save</md-icon>
        Save Changes
      </md-button>
    </div>

    <div v-else>
      <md-card>
        <md-card-content>
         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
       </md-card-content>
      </md-card>
    </div>

  </md-tab>

  <md-tab md-label="EDUCATION" md-icon="school">
    <education
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :certificates="certificates"
    :headline="headline"
    :summary="summary"
    :admin="admin">
  </education>
  </md-tab>

  <md-tab md-label="SKILLS" md-icon="build">
    <skills
    :skills="skills"
    :education="education"
    :certificates="certificates"
    :experiences="experiences"
    :headline="headline"
    :summary="summary"
    :admin="admin">
  </skills>
  </md-tab>

  <md-tab md-label="EXPERIENCE" md-icon="color_lens">
    <experiences
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :certificates="certificates"
    :headline="headline"
    :summary="summary"
    :admin="admin">
  </experiences>
  </md-tab>

  <md-tab md-label="CERTIFICATES" md-icon="library_books">
    <certificates
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :certificates="certificates"
    :headline="headline"
    :summary="summary"
    :admin="admin">
  </certificates>
  </md-tab>

  <!-- <md-tab md-label="PUBLICATION" md-icon="local_library">
    <academic></academic>
  </md-tab> -->
</md-tabs>
</md-tabs>
</template>
<script>
import skills from './skills'
import experiences from './experiences'
import academic from './academic'
import certificates from './certificates'
import education from './education'
import Config from '../../config.js'
import QueryBuilder from '../../services/QueryBuildService.js'
import jwtDecode from 'jwt-decode'

export default {
  data () {
    return {
      userid: null,
      profileid: null,
      skills: [],
      education: [],
      experiences: [],
      certificates: [],
      academic: [],
      headline: '',
      summary: '',
      admin: false
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      // this.$cognitoAuth.isAuthenticated((err, loggedIn) => {
      //   if (err) {
      //     console.err("App: Couldn't get the session:", err, err.stack)
      //     return
      //   }
      //   this.admin = loggedIn
      // })
      this.profileid = this.$route.params.uid
      this.$cognitoAuth.getIdToken((err, jwtToken) => {
        if (err) {
          console.log("Dashboard: Couldn't get the session:", err, err.stack)
          return
        }
        if (jwtToken) {
          this.token = jwtDecode(jwtToken)
          this.user = this.$cognitoAuth.getCurrentUser()
          this.userid = this.user.username
          if (this.userid === this.profileid) {
            this.admin = true
          } else {
            this.admin = false
          }
        }
      })
      var querystring = {
        id: this.profileid
      }
      var url = Config.BASE_URL + '/userdata?' + QueryBuilder.build(querystring)

      fetch(url).then(response => {
        return response.json()
      }).then(data => {
        //  TODO count time and spinner
        if (data[0]) {
          this.skills = data[0]['skills'] ? this.sortbyorder(data[0]['skills']) : []
          this.education = data[0]['education'] ? this.sortbyorder(data[0]['education']) : []
          this.experiences = data[0]['experiences'] ? this.sortbyorder(data[0]['experiences']) : []
          this.certificates = data[0]['certificates'] ? this.sortbyorder(data[0]['certificates']) : []
          this.academic = data[0]['academic'] ? this.sortbyorder(data[0]['academic']) : []
          this.headline = data[0]['headline']
          this.summary = data[0]['summary']
          this.experiences.forEach(item => {
            if (item.to === null) {
              item.to = 'Now'
            }
          })
        }
      }).catch(err => {
        console.error(err)
      })
    },
    sortbyorder (arr) {
      arr.sort(function (a, b) {
        if (!(a.order)) {
          a.order = 1000
        }
        if (!(b.order)) {
          b.order = 1000
        }
        return a.order - b.order
      })
      return arr
    },
    onSave () {
    }
  },
  components: {
    skills: skills,
    experiences: experiences,
    academic: academic,
    certificates: certificates,
    education: education
  }
}
</script>
