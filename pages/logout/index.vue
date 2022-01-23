<template lang="pug">
p Signing out...
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    // @ts-ignore
    this.$auth0.unsetToken()
    this.$router.replace('/')
  }
})
</script>