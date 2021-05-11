import request from '@/utils/request'

export function queryBorrowingList(listQuery) {
  return request({
    url: '/borrowing/query',
    method: 'post',
    data:{
      pageIndex: listQuery.page,
      pageSize: listQuery.limit
    }
  })
}

export function addBorrowing(data) {
  return request({
    url: '/borrowing/add',
    method: 'post',
    data
  })
}

export function queryExpiredBorrowingBooksList(listQuery) {
  return request({
    url: '/borrowing/query/expired',
    method: 'post',
    data:{
      pageIndex: listQuery.page,
      pageSize: listQuery.limit
    }
  })
}

export function returnBook(id){
  return request({
    url: '/borrowing/return/' + id,
    method: 'get'
  })
}
