import request from './request'

const deleteChannel = channelIds => request({
  url: '/channel/delete ',
  method: 'POST',
  data: channelIds
})

const updateChannel = channel => request({
  url: '/channel/update',
  method: 'POST',
  data: channel
})

const createChannel = createChannelFrom => request({
  url: '/channel/save',
  method: 'POST',
  data: createChannelFrom
})
const getChannelInformation = channelId => request({
  url: `/channel/info/${channelId}`
})
const getChannelList = (limit, page) => request({
  url: '/channel/list',
  params: {
    limit,
    page
  }
})
const getAllChannels = () => request({
  url: '/channel/all'
})

export {
  getChannelInformation,
  getChannelList,
  createChannel,
  updateChannel,
  deleteChannel,
  getAllChannels
}
