<template lang="pug">
section.top-container
  .content(v-if='loggedIn()')
    h2 ログイン中です
    NuxtLink.button.is-warning(to='/logout')
      span.icon
        i.fa.fa-sign-out
      span Logout
  .content(v-if='!loggedIn()')
    h2 ログインしてください
    NuxtLink.button.is-primary(to='/login')
      span.icon
        i.fa.fa-sign-in
      span Login
  button.button(@click='ping')= "Ping"
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
