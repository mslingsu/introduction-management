<template>
  <div v-if="admin">
    <div v-for='(row, index) in education' :key='index'>
      <myitem :formtype="type" :data="row"></myitem>
    </div>
    <md-button class="md-accent" @click.native="addEducation">
      <md-icon>add</md-icon>
      Add Education
    </md-button>
    <md-button class="md-accent" @click.native="onSave">
      <md-icon v-if="!done">save</md-icon>
      <md-icon v-if="done">done</md-icon>
      {{savelabel}}
    </md-button>
  </div>

<div v-else>
  <div v-for='(row, index) in education' :key='index'>
  <md-card md-with-hover>
    <md-card-header>
    <div class="md-title">{{row.school}}</div>
    <div class="md-subhead">
      {{row.degree}} in {{row.major}}
      <p>{{row.from}} - {{row.to}}</p>
    </div>
  </md-card-header>

  <md-card-content>
    {{row.dest}}
  </md-card-content>

  </md-card>
</div>
</div>
</template>
<script>
import Config from '../../config.js'
import myitem from './_myitem'

export default {
  data () {
    return {
      type: 'education',
      done: false,
      savelabel: 'Save changes'
    }
  },
  methods: {
    addEducation () {
      var e = {
        school: null,
        degree: null,
        major: null,
        from: null,
        to: null,
        dest: null,
        order: null
      }
      this.education.push(e)
    },
    remove (item) {
      var idx = this.education.indexOf(item)
      if (idx > -1) {
        this.education.splice(idx, 1)
      }
    },
    onSave () {
      // this.education.forEach(item => {
      //   if(item.school.trim().length<=0){
      //     item.school = null
      //   }
      //   if(item.degree.trim().length<=0){
      //     item.degree = null
      //   }
      //   if(item.major.trim().length<=0){
      //     item.major = null
      //   }
      //   if(item.from.trim().length<=0){
      //     item.from = null
      //   }
      //   if(item.to.trim().length<=0){
      //     item.to = null
      //   }
      //   if(item.dest.trim().length<=0){
      //     item.dest = null
      //   }
      // })
      var payload = {
        'id': this.$route.params.uid,
        'summary': this.summary,
        'academic': this.academic,
        'experiences': this.experiences,
        'education': this.education,
        'certificates': this.certificates,
        'awards': this.awards,
        'skills': this.skills
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
  props: ['education', 'skills', 'experiences', 'certificates', 'academic', 'summary', 'admin', 'awards']
}
</script>
