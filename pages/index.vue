<template lang="pug">
section.top-container
  .content(v-if='loggedIn()')
    h2 ログイン中です
    NuxtLink(to='/logout')
      span Logout
  .content(v-if='!loggedIn()')
    h2 ログインしてください
    NuxtLink(to='/login')
      span Login
  button(@click='ping')= "Ping"
  button(@click='secured')= "Secured"
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    loggedIn(): boolean {
      // @ts-ignore
      return this.$auth0.isAuthenticated()
    },
    async ping() {
      const ret = await this.$axios.$get('/api/ping/index')
      console.log(ret)
    }
  }
})
</script>
