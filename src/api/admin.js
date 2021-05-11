import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/admin/logout',
    method: 'get',
    params: { token }
  })
}

export function queryAdminList(listQuery) {
  return request({
    url: '/admin/query',
    method: 'post',
    data:{
      pageIndex: listQuery.page,
      pageSize: listQuery.limit
    }
  })
}

export function queryAdmin(id) {
  return request({
    url: '/admin/query/' + id,
    method: 'get'
  })
}

export function editAdmin(data) {
  return request({
    url: '/admin/edit',
    method: 'Post',
    data
  })
}
