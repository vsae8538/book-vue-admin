import request from '@/utils/request'

export function getSystemCount() {
  return request({
    url: '/system/count/',
    method: 'get'
  })
}
