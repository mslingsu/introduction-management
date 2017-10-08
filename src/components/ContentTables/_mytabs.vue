<template>
<md-tabs md-centered>
  <md-tab md-label="Welcome" md-icon="home">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
  </md-tab>

  <md-tab md-label="EDUCATION" md-icon="school">
    <education
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :admin="admin">
  </education>
  </md-tab>

  <md-tab md-label="SKILLS" md-icon="build">
    <skills
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :admin="admin">
  </skills>
  </md-tab>

  <md-tab md-label="EXPERIENCE" md-icon="color_lens">
    <experiences
    :skills="skills"
    :education="education"
    :experiences="experiences"
    :admin="admin">
  </experiences>
  </md-tab>

  <md-tab md-label="CERTIFICATES" md-icon="library_books">
    <certificates></certificates>
  </md-tab>

  <md-tab md-label="PUBLICATION" md-icon="local_library">
    <academic></academic>
  </md-tab>
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
        if(jwtToken){
          this.token = jwtDecode(jwtToken)
          this.user = this.$cognitoAuth.getCurrentUser()
          this.userid = this.user.username
          if(this.userid === this.profileid){
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
          this.experiences.forEach(item => {
            if(item.to === null){
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
