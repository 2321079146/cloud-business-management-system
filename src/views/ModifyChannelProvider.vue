<template>
  <div class="modify-channel-providerd">
    <p class="modify-channel-providerd-title">修改渠道商详情</p>
    <div class="dividing-line"></div>
    <div class="modify-channel-providerd-main">
      <el-row>
        <el-col :span="20">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="渠道商名称: " >
              <el-input v-model="updateChannelForm.name"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="联系人: " >
              <el-input v-model="updateChannelForm.linkerName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号: " >
              <el-input v-model="updateChannelForm.linkerMobile"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="资源归属: " prop="region" >
              <el-input v-model="updateChannelForm.channelBelongName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="渠道负责人: " >
              <el-input v-model="updateChannelForm.dutyUserName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form ref="form" label-width="100px">
            <el-form-item label="备注: ">
              <el-input v-model="updateChannelForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row><br><br>
      <el-button type="primary" @click="handleUpdateChannelButtonClick">保存</el-button>
      <el-button @click="cancelChannel">取消</el-button>
    </div>
    <br><br><br><br>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'
export default {
  metaInfo: {
    title: '修改渠道商详情'
  },
  data () {
    return {
      updateChannelForm: {
        name: '',
        linkerName: '',
        linkerMobile: 1,
        channelBelongName: '',
        dutyUserName: '',
        remark: ''
      },
      channelId: 1
    }
  },
  methods: {
    cancelChannel () {
      this.$router.push({ path: '/channel-dealer-management' })
    },
    getChannel () {
      this.$store.dispatch('getChannelInformation', this.channelId).then(() => {
        this.updateChannelForm.channelId = this.channel.channelId
        this.updateChannelForm.name = this.channel.name
        this.updateChannelForm.linkerName = this.channel.linkerName
        this.updateChannelForm.channelBelongName = this.channel.channelBelongName
        this.updateChannelForm.dutyUserName = this.channel.dutyUserName
        this.updateChannelForm.remark = this.channel.remark
        this.updateChannelForm.linkerMobile = this.channel.linkerMobile
      })
    },
    handleUpdateChannelButtonClick () {
      this.updateChannel()
    },
    updateChannel () {
      this.$store.dispatch('updateChannel', this.updateChannelForm).then(() => {
        Message({
          message: '保存成功',
          type: 'success'
        })
        this.$router.push({ path: '/channel-dealer-management' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    }
  },
  mounted () {
    this.channelId = this.$route.query.channelId
    this.getChannel()
  },
  computed: {
    ...mapState({
      channel: state => state.channel.channel
    })
  }
}
</script>

<style scoped>
.modify-channel-providerd{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.modify-channel-providerd-title{
  font-size: 20px;
  color: #333;
  text-align: left;
  line-height: 10px;
}
.modify-channel-providerd-main{
  margin-top: 20px;
}
.dividing-line{
  width: 100%;
  height: 1px;
  background-color: #DCDFE6;
  margin-top: 25px;
}
</style>
