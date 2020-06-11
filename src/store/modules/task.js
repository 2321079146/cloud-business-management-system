import { getTaskList, getOnceTaskList, createtask, getTaskDetail, deleteTask, updateTask, transferTask, cancelTask, receiveTask, completeTask, startTask, stopTask, backTask } from '../../api/task'

const state = {
  tasks: {},
  task: {
    baseInformation: {
      task: {},
      customer: {}
    },
    relList: [],
    accountInformation: {
      surplusNum: 10,
      surplusGiftNum: 2
    },
    taskFlowList: []
  },
  stopTask: {}
}
const mutations = {
  'SET_TASKS' (state, tasks) {
    state.tasks = tasks
  },
  'SET_ONCETASKS' (state, onceTasks) {
    state.onceTasks = onceTasks
  },
  'SET_TASK' (state, task) {
    state.task = task
  },
  'SET_STOPTASK' (state, stopTask) {
    state.stopTask = stopTask
  }
}
const actions = {
  async getTaskList ({ commit }, getTaskFrom) {
    const { data: tasks } = await getTaskList(getTaskFrom)
    commit('SET_TASKS', tasks)
  },
  async getOnceTaskList ({ commit }, getOnceTaskFrom) {
    const { data: onceTasks } = await getOnceTaskList(getOnceTaskFrom)
    commit('SET_ONCETASKS', onceTasks)
  },
  async createTask ({ commit }, createtaskForm) {
    const { data: { code, msg } } = await createtask(createtaskForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  async getTaskById ({ commit }, taskId) {
    const response = await getTaskDetail(taskId)
    const task = response.data
    commit('SET_TASK', task)
  },
  async updateTask ({ commit }, updateTaskForm) {
    await updateTask(updateTaskForm)
  },
  // 删除订单
  async deleteTask ({ commit }, taskId) {
    const { data: { code, msg } } = await deleteTask(taskId)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  // 交接任务
  async transferTask ({ commit }, transferTaskForm) {
    const { data: { code, msg } } = await transferTask(transferTaskForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  // 撤回任务
  async cancelTask ({ commit }, cancelTaskForm) {
    const { data: { code, msg } } = await cancelTask(cancelTaskForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  // 接收任务
  async receiveTask ({ commit }, receiveTaskForm) {
    const { data: { code, msg } } = await receiveTask(receiveTaskForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  // 退回任务
  async backTask ({ commit }, backTaskForm) {
    const { data: { code, msg } } = await backTask(backTaskForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  // 开始记账
  async startTask ({ commit }, startTaskForm) {
    const { data: { code, msg } } = await startTask(startTaskForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  // 完成记账
  async completeTask ({ commit }, completeTaskForm) {
    const { data: { code, msg } } = await completeTask(completeTaskForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  // 终止任务
  async stopTask ({ commit }, stopTaskForm) {
    const { data: { code, msg } } = await stopTask(stopTaskForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  }
}

const getters = {
  taskDetail () {
    return state.task
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
