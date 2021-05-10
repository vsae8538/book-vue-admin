import request from '@/utils/request'

export function queryBookList(listQuery) {
  return request({
    url: '/book/query',
    method: 'post',
    data:{
      pageIndex: listQuery.page,
      pageSize: listQuery.limit
    }
  })
}

export function addBook(data) {
  return request({
    url: '/book/add',
    method: 'post',
    data
  })
}

export function queryBook(id) {
  return request({
    url: '/book/query/' + id,
    method: 'get'
  })
}

export function deleteBook(id){
  return request({
    url: '/book/delete/' + id,
    method: 'delete'
  })
}

export function editBook(data) {
  return request({
    url: '/book/edit',
    method: 'Post',
    data
  })
}