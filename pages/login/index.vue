<template lang="pug">
#show-auth
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    // @ts-ignore
    this.$auth0.showLock('show-auth')
  }
})
</script>
