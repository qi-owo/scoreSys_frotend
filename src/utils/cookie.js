// cookie
import Cookies from 'js-cookie';
const TokenKey = 'token';
const InfoKey = 'userInfo';
const RightKey = 'userRight';

export function getToken() { //token
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(value) { //用户信息
  return Cookies.set(InfoKey, value)
}

export function getUserInfo() {
  let userInfo = Cookies.get(InfoKey);
  if(userInfo){
    return JSON.parse(userInfo)
  }else{
    return {}
  }
}

export function removeUserInfo() {
  return Cookies.remove(InfoKey)
}

export function setUserRight(arr) { //用户权限
  return Cookies.set(RightKey, arr)
}

export function removeUserRight() {
  return Cookies.remove(RightKey)
}

export function getUserRight() {
  return Cookies.get(RightKey)
}
