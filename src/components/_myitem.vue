<template>
<md-card v-if="formtype==='skills'" md-with-hover>
  <md-card-content>
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
