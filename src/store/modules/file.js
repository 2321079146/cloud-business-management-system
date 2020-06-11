import { uploadFile, removeFile } from '../../api/file'

const state = {}

const mutations = {}

const actions = {
  async uploadFile ({ commit }, { formData, uploadFileForm }) {
    const { data: { code, msg, file } } = await uploadFile(formData, uploadFileForm)
    if (code !== 0) {
      return Promise.reject(msg)
    } else {
      return Promise.resolve(file)
    }
  },
  async removeFile ({ commit }, fileId) {
    const { data: { code, msg } } = await removeFile(fileId)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
