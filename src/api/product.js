import request from './request'

const getProductDetail = productId => request({
  url: `/product/info/${productId}`
})

const updateProduct = product => request({
  url: '/product/update',
  method: 'POST',
  data: product
})

const deleteProduct = productIds => request({
  url: '/product/delete',
  method: 'POST',
  data: productIds
})

const createProduct = createProductForm => request({
  url: '/product/save',
  method: 'POST',
  data: createProductForm
})

const getProducts = getProductsForm => request({
  url: '/product/list',
  params: getProductsForm
})

const getAllProducts = () => request({
  url: '/product/all'
})

export {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetail,
  getAllProducts
}
