<template>
  <div>
    <div v-if="admin" class="right">
    <md-button class='md-raised md-accent' @click.native='download'>
      <md-icon v-if="!done">cloud_download</md-icon>
      <md-icon v-if="done">done</md-icon>
        <md-tooltip md-direction="left">Download CV as word document</md-tooltip>
      </md-button>
    </div>
<md-tabs md-centered>
  <md-tab md-label="Welcome" md-icon="home">
    <landing
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :certificates="certificates"
    :academic="academic"
    :awards="awards"
    :summary="summary"
    :admin="admin">
    </landing>
  </md-tab>

  <md-tab md-label="EDUCATION" md-icon="school">
    <education
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :certificates="certificates"
    :academic="academic"
    :awards="awards"
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
    :academic="academic"
    :awards="awards"
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
    :academic="academic"
    :awards="awards"
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
    :academic="academic"
    :awards="awards"
    :summary="summary"
    :admin="admin">
  </certificates>
  </md-tab>
  <md-tab md-label="AWARDS" md-icon="star">
    <awards
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :certificates="certificates"
    :academic="academic"
    :awards="awards"
    :summary="summary"
    :admin="admin">
  </awards>
  </md-tab>

  <!-- <md-tab md-label="PUBLICATION" md-icon="local_library">
    <academic></academic>
  </md-tab> -->
</md-tabs>

</div>
</template>
<script>
import landing from './landing'
import skills from './skills'
import experiences from './experiences'
import academic from './academic'
import certificates from './certificates'
import awards from './awards'
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
      awards: [],
      summary: {},
      done: false,
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
          this.awards = data[0]['awards'] ? this.sortbyorder(data[0]['awards']) : []
          this.summary = data[0]['summary'] ? data[0]['summary'] : {name: '', headline: ''}
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
    download () {
      this.profileid = this.$route.params.uid
      var querystring = {
        id: this.profileid
      }
      var url = Config.BASE_URL + '/download?' + QueryBuilder.build(querystring)
      fetch(url).then(response => {
        this.done = true
        window.setTimeout(() => {
          this.done = false
        }, 3000)
        return response.json()
      }).then(data => {
        debugger
        if (data.match(/^https/)) {
          window.location.href = data
        } else {
          console.warn('Invalid download URL', data)
        }
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
    landing: landing,
    skills: skills,
    experiences: experiences,
    academic: academic,
    certificates: certificates,
    education: education,
    awards: awards
  }
}
</script>
