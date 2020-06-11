import { getCustomers, getCustomerDetail, updateCustomer, createCustomer, getCustomerAll } from '../../api/customer'

const state = {
  customers: [],
  allCustomers: [],
  customer: {
    customerId: 101,
    tenantId: 1,
    customerName: '',
    creditCode: '',
    customerFromWay: '',
    customerFromDetail: '',
    customerLinkerName: '',
    customerLinkerPhone: '',
    customerBusinessPhone: null,
    customerBusinessEmail: '',
    customerAddress: '',
    customerStatusValue: '',
    customerStatusName: '',
    customerLevelValue: '',
    customerLevelName: '',
    customerRelUserId: 73,
    customerRelUserName: '',
    customerRelDeptId: 7,
    remark: '',
    createUserId: 2,
    createUserName: '',
    createTime: '',
    updateUserId: null,
    updateUserName: null,
    updateTime: null,
    attribute1: null,
    attribute2: null,
    collectStatusValue: '',
    collectStatusName: '',
    royaltyStatusValue: '',
    royaltyStatusName: '',
    collectDate: null,
    royaltyDate: null,
    royaltyCoefficient: null,
    accountList: null,
    taskList: [
      {
        taskId: 93,
        longTerm: '1',
        tenant_id: null,
        customerId: 101,
        taskNo: '',
        productId: 28,
        productName: '',
        price: 0.01,
        number: 1,
        giftNumber: 0,
        taxDate: null,
        completeCount: 0,
        taskStatusValue: '1',
        taskStatusName: '',
        serviceStartMonth: null,
        relUserId: 1,
        relUserName: '',
        relDeptId: 1,
        relDeptName: null,
        relHelpUserId: null,
        relHelpUserName: '',
        transferredUserId: null,
        transferredUserName: null,
        receiveUserId: null,
        receiveUserName: null,
        createUserId: 2,
        createUserName: '',
        createTime: '',
        updateUserId: null,
        updateUserName: null,
        updateTime: null,
        payCycle: '',
        stopReason: null,
        completeProgress: null,
        taskFlowList: null
      }
    ],
    fileList: [
      {
        fileId: 50,
        dataId: 101,
        type: '',
        fileName: '',
        fileType: '',
        size: '',
        upTime: '',
        upUserId: 2,
        upUserName: '',
        fileUrl: '',
        realPath: '',
        realName: '',
        tenantId: 1
      }
    ],
    latestCollectId: null,
    latestRoyaltyId: null,
    newestTask: null
  }
}

const mutations = {
  'SET_CUSTOMERS' (state, customers) {
    state.customers = customers
  },
  'SET_CUSTOMER' (state, customer) {
    state.customer = customer
  },
  'SET_ALLCUSTOMERS' (state, allCustomers) {
    state.allCustomers = allCustomers
  }
}

const actions = {
  async getCustomers ({ commit }, getCustomersForm) {
    const { data: customers } = await getCustomers(getCustomersForm)
    commit('SET_CUSTOMERS', customers)
  },
  async getCustomerById ({ commit }, customerId) {
    const response = await getCustomerDetail(customerId)
    const customer = response.data.customer.customer
    commit('SET_CUSTOMER', customer)
  },
  async updateCustomer ({ commit }, updateCustomerForm) {
    await updateCustomer(updateCustomerForm)
  },
  async createCustomer ({ commit }, createCustomerForm) {
    const { data: { code, msg } } = await createCustomer(createCustomerForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  async getAllCustomers ({ commit }) {
    const { data: allCustomers } = await getCustomerAll()
    commit('SET_ALLCUSTOMERS', allCustomers)
  }
}

export default {
  state,
  actions,
  mutations
}
