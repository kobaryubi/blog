<template lang="pug">
section.top-container
  h1.title {{ title }}
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
import HeadType from '@/types/HeadType'

type TopDataType = {
  title: string
}

export default Vue.extend({
  data(): TopDataType {
    return {
      title: 'ブログ',
    }
  },
  methods: {
    loggedIn(): boolean {
      // @ts-ignore
      return this.$auth0.isAuthenticated()
    },
    async ping() {
      const ret = await this.$axios.$get('/api/ping/index')
      console.log(ret)
    },
    async secured() {
      const ret = await this.$axios.$get('/api/secured/index', {
        // @ts-ignore
        headers: { Authorization: `Bearer ${this.$auth0.getIdToken()}` },
      })
      console.log(ret)
    },
  },
  head(): HeadType {
    return {
      title: this.title,
      meta: [
        {
          hid: 'top',
          name: 'blog',
          content: 'blog',
        },
      ],
    }
  },
})
</script>
