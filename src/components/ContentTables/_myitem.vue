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
            <md-input type="number" v-model="data.order"></md-input>
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
      <md-input type="number" v-model="data.order"></md-input>
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
    remove(data) {
      if (this.$parent.remove) {
        this.$parent.remove(data)
      }
    }
  },
  props: ['data', 'formtype']
}
</script>
