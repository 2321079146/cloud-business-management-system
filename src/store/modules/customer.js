import { getCustomers, getCustomerDetail } from '../../api/customer'

const state = {
  customers: [],
  customer: {}
}

const mutations = {
  'SET_CUSTOMERS' (state, customers) {
    state.customers = customers
  },
  'SET_CUSTOMER' (state, customer) {
    state.customer = customer
  }
}

const actions = {
  async getCustomers ({ commit }, getCustomersForm) {
    const { type, limit, page } = getCustomersForm
    const { data: customers } = await getCustomers(type, limit, page)
    console.log(customers)
    commit('SET_CUSTOMERS', customers)
  },
  async getCustomerById ({ commit }, customerId) {
    const { data: customer } = getCustomerDetail(customerId)
    commit('SET_CUSTOMER', customer)
  }
}

export default {
  state,
  actions,
  mutations
}
