<template>
  <div class="create-channel-providerd">
    <p class="create-channel-providerd-title">新建渠道商</p>
    <div class="dividing-line"></div>
    <div class="create-channel-providerd-main">
      <el-row>
        <el-col :span="8">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="渠道商名称" required>
              <el-input v-model="createChannelForm.name"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="联系人" required>
              <el-input v-model="createChannelForm.linkerName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" required>
              <el-input v-model="createChannelForm.linkerMobile"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="资源归属" required>
              <el-select placeholder="请选择"
              v-model="createChannelForm.channelBelongValue"
              @change="handleChannelBelong">
                <el-option
                v-for="(channelBelongType, index)  in channelBelongTypes"
                :key="index"
                :label="channelBelongType.name"
                :value="channelBelongType.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="渠道负责人" required>
              <el-select
                v-model="createChannelForm.dutyUserId"
                @change="handleEditTaskFormFinancialAdviserSelectChange">
                <el-option
                  v-for="user in allUsers"
                  :key="user.userId"
                  :label="user.userName"
                  :value="user.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form ref="form" label-width="100px">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="createChannelForm.remark"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-button  @click="cancelChannel">取消</el-button>
    <el-button type="primary" :loading="isChannelProvider" @click="handelCreteChannelButtonClick">保存</el-button><br><br><br><br>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: '新建渠道商'
  },
  data () {
    return {
      createChannelForm: {
        name: '',
        linkerName: '',
        dutyUserId: '',
        linkerMobile: '',
        remark: '',
        channelBelongName: '',
        channelBelongValue: '',
        dutyUserName: ''
      },
      channelBelongTypes: [
        {
          name: '公司资源',
          value: '0'
        },
        {
          name: '负责人归属',
          value: '1'
        }
      ],
      isChannelProvider: false
    }
  },
  methods: {
    cancelChannel () {
      this.$router.push({ path: '/channel-dealer-management' })
    },
    handleChannelBelong (value) {
      this.createChannelForm.channelBelongName = this.getChannelTypeName(value)
    },
    getChannelTypeName (value) {
      if (value === '0') {
        return '公司资源'
      }
      return '负责人归属'
    },
    handelCreteChannelButtonClick () {
      this.createChannel(this.createChannelForm)
    },
    createChannel () {
      this.isChannelProvider = true
      // this.createChannelForm.createUserId = this.userInfo.userId
      // this.createChannelForm.createUserName = this.userInfo.userName
      this.$store.dispatch('createChannel', this.createChannelForm).then(() => {
        Message({
          message: '保存成功',
          type: 'success'
        })
        this.isChannelProvider = false
        this.$router.push({ path: '/channel-dealer-management' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
        this.isChannelProvider = false
      })
    },
    handleEditTaskFormFinancialAdviserSelectChange (id) {
      this.createChannelForm.dutyUserName = this.getUserName(id)
    },
    getUserName (id) {
      return this.allUsers.filter(({ userId }) => userId === id)[0].userName
    },
    // 获取所有人员名称
    getUsers () {
      this.$store.dispatch('getUserList')
    },
    // 获取用户信息
    getUserInfo () {
      this.$store.dispatch('getSysInfo')
    }
  },
  mounted () {
    this.getUsers()
    this.getUserInfo()
  },
  computed: {
    ...mapState({
      // 获取所有用户
      allUsers: state => state.sysUser.users.list,
      userInfo: state => state.sysUser.user.user
    })
  }
}
</script>

<style scoped>
.create-channel-providerd{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.create-channel-providerd-title{
  font-size: 20px;
  color: #333;
  text-align: left;
  line-height: 10px;
}
.create-channel-providerd-main{
  margin-top: 20px;
}
</style>
