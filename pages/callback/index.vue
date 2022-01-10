<template lang="pug">
p Signingin...
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    // @ts-ignore
    this.$auth0.setTokenByQuery()
    // @ts-ignore
    this.$router.replace(this.$PAGE_URL.TOP)
  }
})
</script>