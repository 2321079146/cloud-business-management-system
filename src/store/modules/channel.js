import { getChannelList, createChannel, updateChannel, getChannelInformation, deleteChannel, getAllChannels } from '../../api/channel'

const state = {
  channels: {},
  channel: {},
  allChannels: {}
}

const mutations = {
  'SET_CHANNELS' (state, channels) {
    state.channels = channels
  },
  'SET_CHANNEL' (state, channel) {
    state.channel = channel
  },
  'SET_AllCHANNELS' (state, allChannels) {
    state.allChannels = allChannels
  }
}

const actions = {
  async getChannelList ({ commit }, getChannelFrom) {
    const { limit, page } = getChannelFrom
    const { data: channels } = await getChannelList(limit, page)
    commit('SET_CHANNELS', channels)
  },
  async createChannel ({ commit }, createChannelFrom) {
    const response = await createChannel(createChannelFrom)
    console.log(response)
  },
  async updateChannel ({ commit }, updateChannelForm) {
    const { data: { code, msg } } = await updateChannel(updateChannelForm)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  async getChannelInformation ({ commit }, channelId) {
    const { data: channel } = await getChannelInformation(channelId)
    commit('SET_CHANNEL', channel.channel)
  },
  async deleteChannel ({ commit }, channelIds) {
    const { data: { code, msg } } = await deleteChannel(channelIds)
    if (code !== 0) {
      return Promise.reject(msg)
    }
  },
  async getAllChannels ({ commit }) {
    const { data: list } = await getAllChannels()
    console.log(list)
    commit('SET_AllCHANNELS', list)
  }
}

export default {
  state,
  actions,
  mutations
}
