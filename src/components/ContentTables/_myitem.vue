<template>
<md-card md-with-hover>
  <md-card-content v-if="formtype==='skills'">
    <md-layout md-gutter>
      <md-layout md-flex="30">
        <md-layout md-column>
          <md-input-container>
            <label>Skill</label>
            <md-input v-model="data.skill"></md-input>
          </md-input-container>
        </md-layout>
      </md-layout>
      <md-layout md-flex="60">
        <md-layout md-column>
          <md-input-container>
            <label>Details</label>
            <md-textarea v-model="data.Details"></md-textarea>
          </md-input-container>
        </md-layout>
      </md-layout>
      <md-layout md-flex="10">
        <md-layout md-column>
          <md-input-container>
            <label>Order</label>
            <md-input type="number" min=0 v-model="data.order"></md-input>
          </md-input-container>
        </md-layout>
      </md-layout>
    </md-layout>
  </md-card-content>
  <md-card-content v-if="formtype==='education'">
    <md-input-container>
      <label>School Name</label>
      <md-input class="md-title" v-model="data.school"></md-input>
    </md-input-container>

    <md-layout md-gutter>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>Degree</label>
          <md-input v-model="data.degree"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>Major</label>
          <md-input v-model="data.major"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    </md-layout>

    <md-layout md-gutter>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>From Year</label>
          <md-input type="number" v-model="data.from"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>To Year</label>
          <md-input type="number" v-model="data.to"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    </md-layout>
    <md-input-container>
      <label>Description</label>
      <md-input v-model="data.dest"></md-input>
    </md-input-container>
    <md-input-container>
      <label>Order</label>
      <md-input type="number" min=0 v-model="data.order"></md-input>
    </md-input-container>
  </md-card-content>

  <md-card-content v-if="formtype==='experience'">
    <md-input-container>
      <label>Company Name</label>
      <md-input class="md-title" v-model="data.company"></md-input>
    </md-input-container>

    <md-layout md-gutter>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>Title</label>
          <md-input v-model="data.title"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>Department</label>
          <md-input v-model="data.depart"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    </md-layout>

    <md-layout md-gutter>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>From Year</label>
          <md-input type="number" v-model="data.from"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>To Year</label>
          <md-input type="number" v-model="data.to"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    </md-layout>
    <md-input-container>
      <label>Location</label>
      <md-input v-model="data.location"></md-input>
    </md-input-container>
    <md-input-container>
      <label>Description</label>
      <md-textarea v-model="data.dest"></md-textarea>
    </md-input-container>
    <md-input-container>
      <label>Order</label>
      <md-input type="number" min=0 v-model="data.order"></md-input>
    </md-input-container>
  </md-card-content>

  <md-card-content v-if="formtype==='certificate'">
    <md-input-container>
      <label>Certificate Name</label>
      <md-input class="md-title" v-model="data.cert"></md-input>
    </md-input-container>
    <md-input-container>
      <label>Issued By</label>
      <md-input v-model="data.authby"></md-input>
    </md-input-container>

    <md-layout md-gutter>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>From</label>
          <md-input type="number" max=2018 min=1900 v-model="data.fromyear"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <md-select v-model="data.frommonth">
            <md-option value="January">January</md-option>
            <md-option value="February">February</md-option>
            <md-option value="March">March</md-option>
            <md-option value="April">April</md-option>
            <md-option value="May">May</md-option>
            <md-option value="June">June</md-option>
            <md-option value="July">July</md-option>
            <md-option value="August">August</md-option>
            <md-option value="September">September</md-option>
            <md-option value="October">October</md-option>
            <md-option value="November">November</md-option>
            <md-option value="December">December</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
    </md-layout>
    </md-layout>

    <md-layout md-gutter>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <label>To</label>
          <md-input type="number" v-model="data.toyear"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-layout md-flex="50">
      <md-layout md-column>
        <md-input-container>
          <md-select v-model="data.tomonth">
            <md-option value="January">January</md-option>
            <md-option value="February">February</md-option>
            <md-option value="March">March</md-option>
            <md-option value="April">April</md-option>
            <md-option value="May">May</md-option>
            <md-option value="June">June</md-option>
            <md-option value="July">July</md-option>
            <md-option value="August">August</md-option>
            <md-option value="September">September</md-option>
            <md-option value="October">October</md-option>
            <md-option value="November">November</md-option>
            <md-option value="December">December</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
    </md-layout>
    </md-layout>
    <md-input-container>
      <label>License Number</label>
      <md-input v-model="data.license"></md-input>
    </md-input-container>
    <md-input-container>
      <label>Certification URL</label>
      <md-input v-model="data.url"></md-input>
    </md-input-container>
    <md-input-container>
      <label>Order</label>
      <md-input type="number" min=0 v-model="data.order"></md-input>
    </md-input-container>
  </md-card-content>


  <md-card-actions>
    <md-button class="md-fab md-mini md-warn" @click.native="remove(data)">
      <md-icon>delete</md-icon>
    </md-button>
  </md-card-actions>
</md-card>
</template>

<script>
export default {
  methods: {
    remove (data) {
      if (this.$parent.remove) {
        this.$parent.remove(data)
      }
    }
  },
  props: ['data', 'formtype']
}
</script>
