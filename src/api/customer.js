import request from './request'

const updateCustomer = customer => request({
  url: '/customer/update',
  method: 'POST',
  params: customer
})

const createCustomer = customer => request({
  url: '/customer/add',
  method: 'POST',
  data: customer
})
const getCustomers = ({ params, data }) => request({
  url: '/customer/list',
  method: 'POST',
  params,
  data
})

const getCustomerAll = () => request({
  url: '/customer/all',
  method: 'GET'
})

const getCustomerDetail = customerId => request({
  url: `/customer/detail/${customerId}`
})

export {
  createCustomer,
  getCustomers,
  getCustomerDetail,
  updateCustomer,
  getCustomerAll
}
