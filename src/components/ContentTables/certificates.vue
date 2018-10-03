<template>
  <div v-if="admin">
    <div v-for='(row, index) in certificates' :key='index'>
      <myitem :formtype="type" :data="row"></myitem>
    </div>
    <md-button class="md-accent" @click.native="addCert">
      <md-icon>add</md-icon>
      Add certificates
    </md-button>
    <md-button class="md-accent" @click.native="onSave">
      <md-icon>save</md-icon>
      Save Changes
    </md-button>
  </div>

<div v-else>
  <div v-for='(row, index) in certificates' :key='index'>
  <md-card md-with-hover>
    <md-card-header>
    <div class="md-title">{{row.cert}}</div>
    <div class="md-subhead">
      <p>by {{row.authby}}</p>
      <p>{{row.frommonth}} {{row.fromyear}} - {{row.tomonth}} {{row.toyear}}</p>
    </div>
  </md-card-header>

  <md-card-content>
    <p>License {{row.license}}</p>
    <a :href='row.url' target="_blank">See Certificate</a>
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
      url: ['www.google.com', 'www.amazon.com'],
      type: 'certificate'
    }
  },
  methods: {
    addCert () {
      var e = {
        cert: null,
        frommonth: null,
        fromyear: null,
        tomonth: null,
        toyear: null,
        authby: null,
        license: null,
        url: null,
        order: null
      }
      this.certificates.push(e)
    },
    remove (item) {
      var idx = this.certificates.indexOf(item)
      if (idx > -1) {
        this.certificates.splice(idx, 1)
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
  props: ['education', 'skills', 'experiences', 'certificates', 'academic', 'summary', 'admin']
}
</script>
