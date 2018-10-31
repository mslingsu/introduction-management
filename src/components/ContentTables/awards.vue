<template>
  <div v-if="admin">
    <div v-for='(row, index) in awards' :key='index'>
      <myitem :formtype="type" :data="row"></myitem>
    </div>
    <md-button class="md-accent" @click.native="addAward">
      <md-icon>add</md-icon>
      Add award
    </md-button>
    <md-button class="md-accent" @click.native="onSave">
      <md-icon v-if="!done">save</md-icon>
      <md-icon v-if="done">done</md-icon>
      {{savelabel}}
    </md-button>
  </div>

<div v-else>
  <div v-for='(row, index) in awards' :key='index'>
  <md-card md-with-hover>
    <md-card-header>
    <div class="md-title">{{row.award}}</div>
  </md-card-header>

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
      type: 'awards',
      done: false,
      savelabel: 'Save changes'
    }
  },
  methods: {
    addAward () {
      var e = {
        award: null,
        order: null
      }
      this.awards.push(e)
    },
    remove (item) {
      var idx = this.awards.indexOf(item)
      if (idx > -1) {
        this.awards.splice(idx, 1)
      }
    },
    onSave () {
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
