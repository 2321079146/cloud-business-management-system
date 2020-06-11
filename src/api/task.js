import request from './request'
// 代理记账
const getTaskList = data => request({
  url: `/task/longTask?limit=${data.limit}&page=${data.page}`,
  method: 'POST',
  data: { type: data.type, taskStatusValue: data.taskStatusValue }
})
// 一次性订单
const getOnceTaskList = data => request({
  url: `/task/shortTask?limit=${data.limit}&page=${data.page}`,
  method: 'POST',
  data: { type: data.type, taskStatusValue: data.taskStatusValue }
})
// 删除订单
const deleteTask = taskId => request({
  url: '/task/delete',
  method: 'delete',
  params: { taskId: taskId }
})
const createtask = createtaskForm => request({
  url: '/task/add',
  method: 'POST',
  params: createtaskForm
})
const getTaskDetail = taskId => request({
  url: `/task/detail/${taskId} `
})
const updateTask = updateTaskForm => request({
  url: '/task/update',
  method: 'POST',
  params: updateTaskForm
})
// 交接任务
const transferTask = transferTaskForm => request({
  url: '/task/transfer',
  method: 'POST',
  params: transferTaskForm
})
// 撤回任务
const cancelTask = cancelTaskForm => request({
  url: '/task/cancelRel',
  method: 'POST',
  params: cancelTaskForm
})
// 接收任务
const receiveTask = receiveTaskForm => request({
  url: '/task/receiveTask',
  method: 'POST',
  params: receiveTaskForm
})
// 完成记账
const completeTask = completeTaskForm => request({
  url: '/task/completeTask',
  method: 'POST',
  params: completeTaskForm
})
// 终止任务
const stopTask = stopTaskForm => request({
  url: '/task/stopTask',
  params: stopTaskForm
})
// 退回任务
const backTask = backTaskForm => request({
  url: '/task/backTask',
  method: 'POST',
  params: backTaskForm
})
// 开始记账
const startTask = startTaskForm => request({
  url: '/task/startTask',
  params: startTaskForm
})

export {
  getTaskList,
  createtask,
  getTaskDetail,
  updateTask,
  transferTask,
  cancelTask,
  receiveTask,
  completeTask,
  stopTask,
  backTask,
  getOnceTaskList,
  deleteTask,
  startTask
}
