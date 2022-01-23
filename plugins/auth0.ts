import Auth0Lock from 'auth0-lock'
import jwtDecode from 'jwt-decode'
import queryString from 'query-string'
import nuxtConfig from '~/nuxt.config'

const config = nuxtConfig.auth0

const ACCESS_TOKEN = 'accessToken'
const ID_TOKEN = 'idToken'
const EXPIRES_AT = 'expiresAt'
const USER = 'user'

export class Auth0Util {
  showLock(container: any) {
    const lock = new Auth0Lock(config.clientID, config.domain, {
      container,
      closable: false,
      auth: {
        responseType: 'token id_token',
        redirectUrl: this.getBaseUrl() + '/callback',
        params: { scope: 'openid profile email' }
      }
    })

    lock.show()
  }

  getQueryParams() {
    return queryString.parse(location.hash)
  }

  setToken({
    access_token,
    id_token
  }: {
    access_token: string
    id_token: string
  }) {
    const user = jwtDecode(id_token)
    const { exp } = user as { exp: string }

    const localStorage = window.localStorage
    localStorage.setItem(ACCESS_TOKEN, access_token)
    localStorage.setItem(ID_TOKEN, id_token)
    localStorage.setItem(EXPIRES_AT, exp)
    localStorage.setItem(USER, JSON.stringify(user))
  }

  setTokenByQuery() {
    this.setToken(
      this.getQueryParams() as {
        access_token: string
        id_token: string
      }
    )
  }

  getBaseUrl() {
    return `${window.location.protocol}//${window.location.host}`
  }

  isAuthenticated() {
    const expiresAt = Number(window.localStorage.getItem('expiresAt'))
    return new Date().getTime() / 1000 < expiresAt
  }

  unsetToken() {
    const localStorage = window.localStorage
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(ID_TOKEN)
    localStorage.removeItem(EXPIRES_AT)
    localStorage.removeItem(USER)
  }

  getIdToken() {
    return this.isAuthenticated() ? localStorage.getItem('idToken') : null
  }
}

export default (context: any, inject: any) => {
  inject('auth0', new Auth0Util())
}
