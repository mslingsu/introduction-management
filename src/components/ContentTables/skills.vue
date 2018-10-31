<template>
<div v-if="admin">
  <div v-for='(row, index) in skills' :key='index'>
    <myitem :formtype="type" :data="row"></myitem>
  </div>
  <md-button class="md-accent" @click.native="addSkill">
    <md-icon>add</md-icon>
    Add A Skill
  </md-button>
  <md-button class="md-accent" @click.native="onSave">
    <md-icon v-if="!done">save</md-icon>
    <md-icon v-if="done">done</md-icon>
    {{savelabel}}
  </md-button>
</div>

<div v-else>
  <div v-for='(row, index) in skills' :key='index'>
  <md-card md-with-hover>
    <md-card-header>
    <div class="md-title">{{row.skill}}</div>
    <div class="md-subhead">{{row.Details}}</div>
  </md-card-header>

  </md-card>
</div>
</div>
<!-- <md-table v-else>
  <md-table-header>
    <md-table-row>
      <md-table-head>Skills</md-table-head>
      <md-table-head>Details</md-table-head>
    </md-table-row>
  </md-table-header>
  <md-table-body>
    <md-table-row v-for='(row, index) in skills' :key='index'>
      <md-table-cell class="md-title">{{row.skill}}</md-table-cell>
      <md-table-cell class="md-subhead">{{row.Details}}</md-table-cell>
    </md-table-row>
  </md-table-body>
</md-table> -->
</template>

<script>
import Config from '../../config.js'
import myitem from './_myitem'

export default {
  data () {
    return {
      type: 'skills',
      done: false,
      savelabel: 'Save changes'
    }
  },
  methods: {
    addSkill () {
      var k = {
        skill: null,
        Details: null,
        order: null
      }
      this.skills.push(k)
    },
    remove (skill) {
      var idx = this.skills.indexOf(skill)
      if (idx > -1) {
        this.skills.splice(idx, 1)
      }
    },
    onSave () {
      var payload = {
        'id': this.$route.params.uid,
        'summary': this.summary,
        'academic': this.academic,
        'experiences': this.experiences,
        'skills': this.skills,
        'certificates': this.certificates,
        'awards': this.awards,
        'education': this.education
      }
      var body = JSON.stringify(payload)
      var opts = {
        method: 'POST',
        body: body,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
      var url = Config.BASE_URL + '/userdata'
      fetch(url, opts).then(response => {
        var data = response.json()
        this.done = true
        this.savelabel = 'Changes saved'
        window.setTimeout(() => {
          this.savelabel = 'Save changes'
          this.done = false
        }, 3000)
        console.log(data)
        return data
      }, function (err) {
        console.error(err)
      })
    }
  },
  components: {
    myitem: myitem
  },
  props: ['skills', 'education', 'experiences', 'certificates', 'academic', 'summary', 'admin', 'awards']
}
</script>
