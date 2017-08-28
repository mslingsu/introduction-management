<template>
<md-tabs md-centered>
  <md-tab md-label="Welcome" md-icon="home">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
  </md-tab>

  <md-tab md-label="EDUCATION" md-icon="school">
    <education></education>
  </md-tab>

  <md-tab md-label="PROGRAMMING SKILLS" md-icon="build">
    <skills :skills="skills" :admin="authenticated"></skills>
  </md-tab>

  <md-tab md-label="WORK EXPERIENCE" md-icon="color_lens">
    <experiences></experiences>
  </md-tab>

  <md-tab md-label="CERTIFICATES" md-icon="library_books">
    <certificates></certificates>
  </md-tab>

  <md-tab md-label="ACADEMIC PROJECTS" md-icon="local_library">
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
import Config from '../config.js'
import QueryBuilder from '../services/QueryBuildService.js'

export default {
  data () {
    return {
      userid: 'mslingsu',
      skills: [],
      education: [],
      experiences: [],
      certificates: [],
      academic: []
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      var querystring = {
        id: this.userid
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
  },
  props: ['auth', 'authenticated']
}
</script>
