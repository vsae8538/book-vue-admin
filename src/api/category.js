import request from '@/utils/request'

export function queryCategoryList(listQuery) {
  return request({
    url: '/category/query',
    method: 'post',
    data:{
      pageIndex: listQuery.page,
      pageSize: listQuery.limit,
      categoryName: listQuery.categoryName
    }
  })
}

export function addCategory(data) {
  return request({
    url: '/category/add',
    method: 'post',
    data
  })
}

export function queryCategory(id) {
  return request({
    url: '/category/query/' + id,
    method: 'get'
  })
}

export function deleteCategory(id){
  return request({
    url: '/category/delete/' + id,
    method: 'delete'
  })
}

export function editCategory(data) {
  return request({
    url: '/category/edit',
    method: 'post',
    data
  })
}