import Vue from 'vue';
const tokenKey = 'accessToken';

export function setToken (token: string) {
  return Vue.$cookies.set(tokenKey, token, '365d');
}

export function getToken () {
  return Vue.$cookies.get(tokenKey);
}

export function removeToken () {
  return Vue.$cookies.remove(tokenKey);
}
