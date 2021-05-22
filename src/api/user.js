import request from '@/utils/request'

export function queryUserList(listQuery) {
  return request({
    url: '/user/query',
    method: 'post',
    data:{
      pageIndex: listQuery.page,
      pageSize: listQuery.limit,
      userName: listQuery.username,
      telPhone: listQuery.telPhone
    }
  })
}

export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function queryUser(id) {
  return request({
    url: '/user/query/' + id,
    method: 'get'
  })
}

export function deleteUser(id){
  return request({
    url: '/user/delete/' + id,
    method: 'delete'
  })
}

export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'Post',
    data
  })
}