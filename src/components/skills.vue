<template>
<div v-if="admin">
  <div v-for='(row, index) in skills' :key='index'>
    <myitem :formtype="type" :data="row"></myitem>
  </div>
  <md-button class="md-raised md-primary" @click.native="addSkill">
    <md-icon>add</md-icon>
    Add A Skill
  </md-button>
  <md-button class="md-raised md-accent" @click.native="onSave">
    <md-icon>save</md-icon>
    Save Changes
  </md-button>
</div>

<md-table v-else>
  <md-table-header>
    <md-table-row>
      <md-table-head>Skills</md-table-head>
      <md-table-head>Details</md-table-head>
      <!-- <md-table-head md-sort-by='order' md-numeric>Order</md-table-head> -->
    </md-table-row>
  </md-table-header>

  <md-table-body>
    <md-table-row v-for='(row, index) in skills' :key='index'>
      <md-table-cell>{{row.skill}}</md-table-cell>
      <md-table-cell>{{row.Details}}</md-table-cell>
      <!-- <md-table-cell md-numeric>{{row.order}}</md-table-cell> -->
    </md-table-row>
  </md-table-body>
</md-table>
</template>

<script>
import Config from '../config.js'
import myitem from './_myitem'

export default {
  data () {
    return {
      type: 'skills'
    }
  },
  methods: {
    addSkill () {
      var k = {
        skill: '',
        Details: '',
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
        'id': this.userid,
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
  props: ['skills', 'admin']
}
</script>
