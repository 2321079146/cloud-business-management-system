import request from './request'

const getTaskList = (limit, page) => request({
  url: '/task/list',
  params: {
    limit,
    page
  }
})
const createtask = createtaskForm => request({
  url: '/task/add',
  method: 'POST',
  params: createtaskForm
})
const getTaskDetail = taskId => request({
  url: `/task/detail/${taskId} `
})
const updateTask = taskId => request({
  url: '/task/update',
  method: 'POST',
  data: taskId
})

export {
  getTaskList,
  createtask,
  getTaskDetail,
  updateTask
}
