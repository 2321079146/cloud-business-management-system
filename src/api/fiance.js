import request from './request'

const getFianceDetail = fianceId => request({
  url: `/fiance/detail/${fianceId}`
})

const updateFiance = fiance => request({
  url: '/fiance/update',
  method: 'POST',
  params: fiance
})

// 1. 第一步
// 先写 api 接口
// 括号里的是参数
const createFiance = createFianceForm => request({
  url: '/fiance/add',

  // 请求方式
  // 默认为 GET 时不用写
  // 对应 Postman 左边的 GET 和 POST
  method: 'POST',
  params: createFianceForm
})

const getDiaryReportList = data => request({
  url: `/fiance/list?limit=${data.limit}&page=${data.page}`,
  method: 'POST',
  data: data
})
// 合计接口获取
const getTotalCash = data => request({
  url: '/fiance/total',
  method: 'POST',
  data: data
})

const check = checkForm => request({
  url: '/fiance/check',
  params: checkForm
})

export {
  getDiaryReportList,

  // 1.1 导出 对应上面写的函数名
  createFiance,
  updateFiance,
  getFianceDetail,
  getTotalCash,
  check
}
