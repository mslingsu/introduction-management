<template>
  <div v-if="admin">
    <div v-for='(row, index) in experiences' :key='index'>
      <myitem :formtype="type" :data="row"></myitem>
    </div>
    <md-button class="md-raised md-primary" @click.native="addExperience">
      <md-icon>add</md-icon>
      Add experiences
    </md-button>
    <md-button class="md-raised md-accent" @click.native="onSave">
      <md-icon>save</md-icon>
      Save Changes
    </md-button>
  </div>

<div v-else>
  <div v-for='(row, index) in experiences' :key='index'>
  <md-card md-with-hover>
    <md-card-header>
    <div class="md-title">{{row.company}}</div>
    <div class="md-subhead">
      {{row.title}} in {{row.depart}}
      <p>{{row.from}} - {{row.to}}</p>
      <p>{{row.location}}</p>
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
      type: 'experience'
    }
  },
  methods: {
    addExperience () {
      var exp = {
        company: null,
        title: null,
        depart: null,
        from: null,
        to: null,
        location: null,
        dest: null,
        order: null
      }
      this.experiences.push(exp)
    },
    remove (item) {
      var idx = this.experiences.indexOf(item)
      if (idx > -1) {
        this.experiences.splice(idx, 1)
      }
    },
    onSave () {
      var payload = {
        'id': this.$route.params.uid,
        'experiences': this.experiences,
        'education': this.education,
        'certificates': this.certificates,
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
  props: ['education', 'skills', 'experiences', 'certificates', 'admin']
}
</script>
