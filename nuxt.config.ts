import { NuxtConfig } from '@nuxt/types'

const nuxtConfig: NuxtConfig = {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blog',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  plugins: ['~/plugins/auth0.ts', '~/plugins/constants.ts'],

  auth0: {
    domain: 'blog-dv.jp.auth0.com',
    clientID: 'JxebYQvCQxU3QtL0Rou5IDpe0EvgDDMP',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  modules: ['@nuxtjs/proxy', '@nuxtjs/axios', '@nuxtjs/gtm'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    baseURL: '/',
  },

  gtm: {
    id: 'GTM-5WBX5CB',
  },

  publicRuntimeConfig: {
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID,
    },
  },
}

if (process.env.NODE_ENV === 'development') {
  nuxtConfig.proxy = {
    '/api': 'http://localhost:3000',
  }
}

export default nuxtConfig
