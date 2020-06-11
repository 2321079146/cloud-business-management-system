import request from './request'

const uploadFile = (formData, uploadFileForm) => request({
  url: '/file/upload',
  method: 'POST',
  data: formData,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  params: uploadFileForm
})

const removeFile = fileId => request({
  url: '/file/delete',
  method: 'DELETE',
  params: { fileId: fileId }
})

export {
  uploadFile,
  removeFile
}
