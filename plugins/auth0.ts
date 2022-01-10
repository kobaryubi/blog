import Auth0Lock from 'auth0-lock'
import jwtDecode from 'jwt-decode'
import queryString from 'query-string'
import nuxtConfig from '~/nuxt.config'

const config = nuxtConfig.auth0

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
    localStorage.setItem('accessToken', access_token)
    localStorage.setItem('idToken', id_token)
    localStorage.setItem('expiresAt', exp)
    localStorage.setItem('user', JSON.stringify(user))
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
}

export default (context: any, inject: any) => {
  inject('auth0', new Auth0Util())
}
