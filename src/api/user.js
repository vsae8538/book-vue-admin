import request from '@/utils/request'

export function login(data) {
  return request({
    //url: '/vue-admin-template/user/login',
    url: '/system/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/system/logout',
    method: 'post'
  })
}
