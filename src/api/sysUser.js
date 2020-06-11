import request from './request'
// import { Password } from 'ant-design-vue/types/input/password'

const updateSysInfo = user => request({
  url: '/sys/user/update',
  method: 'POST',
  data: user
})
const getSysInfo = () => request({
  url: '/sys/user/info'
})
const updatePassWord = password => request({
  url: '/sys/user/password',
  params: password
})
const getUserList = () => request({
  url: '/sys/user/list'
})
export {
  updateSysInfo,
  getSysInfo,
  updatePassWord,
  getUserList
}
