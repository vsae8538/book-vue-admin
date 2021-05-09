import request from '@/utils/request'

export function queryList(listQuery) {
  return request({
    url: '/book/query',
    method: 'post',
    data:{
      pageIndex: listQuery.page,
      pageSize: listQuery.limit
    }
  })
}

export function add(data) {
  return request({
    url: '/book/add',
    method: 'post',
    data
  })
}

export function queryOne(id) {
  return request({
    url: '/book/query/' + id,
    method: 'get',
    params: { token }
  })
}

export function deleteOne(id){
  return request({
    url: '/book/delete/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/book/edit',
    method: 'delete',
    data
  })
}