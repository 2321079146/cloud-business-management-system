import { getProducts, createProduct, updateProduct, deleteProduct, getProductDetail, getAllProducts } from '../../api/product'

const state = {
  products: {
    page: {
      list: []
    }
  },
  product: {},
  allProducts: []
}

const mutations = {
  'SET_PRODUCTS' (state, products) {
    state.products = products
  },
  'SET_PRODUCT' (state, product) {
    state.product = product
  },
  'SET_AllPRODUCT' (state, allProducts) {
    state.allProducts = allProducts
  }
}

const actions = {
  async getProducts ({ commit }, getProductsForm) {
    const { data: products } = await getProducts(getProductsForm)
    commit('SET_PRODUCTS', products)
  },
  async createProduct ({ commit }, createProductForm) {
    const { data: { code, msg } } = await createProduct(createProductForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  async getProductById ({ commit }, productId) {
    const response = await getProductDetail(productId)
    const product = response.data.product
    commit('SET_PRODUCT', product)
  },
  async updateProduct ({ commit }, updateProductForm) {
    const { data: { code, msg } } = await updateProduct(updateProductForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  async deleteProduct ({ commit }, productIds) {
    const { data: { code, msg } } = await deleteProduct(productIds)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  async getAllProducts ({ commit }) {
    const { data: list } = await getAllProducts()
    commit('SET_AllPRODUCT', list)
  }
}

export default {
  state,
  actions,
  mutations
}
