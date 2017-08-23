<template>
<md-tabs md-centered>
  <md-tab md-label="Welcome" md-icon="home">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
  </md-tab>

  <md-tab md-label="EDUCATION" md-icon="school">
    <education></education>
  </md-tab>

  <md-tab md-label="PROGRAMMING SKILLS" md-icon="build">
    <skills></skills>
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

export default {

  components: {
    skills: skills,
    experiences: experiences,
    academic: academic,
    certificates: certificates,
    education: education
  }
}
</script>
