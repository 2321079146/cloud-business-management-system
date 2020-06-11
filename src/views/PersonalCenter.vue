<template>
  <div class="personal-center">
    <p class="personalCenter-title">个人信息</p>
    <div class="dividing-line"></div>
      <div class="personal-center-main">
        <el-form  ref="ruleForm" label-position="top" label-width="100px">
          <el-row>
            <el-col :span="8" style="padding-right:25px;">
              <el-form-item label="姓名: " prop="name">
                <el-input v-model="updateUserForm.userName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别: " prop="name">
                <el-radio-group v-model="updateUserForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="padding-right:25px;">
              <el-form-item label="手机号码: " prop="name">
                <el-input v-model="updateUserForm.mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱地址: " prop="name">
                <el-input v-model="updateUserForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="padding-right:25px;">
              <el-form-item label="用户名: " prop="name">
                <span>{{userInfo.user.account}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登录密码: " prop="name">
                <!-- <span type="password">{{userInfo.user.salt}}</span> -->
                <span>***</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" style="padding-right:25px;">
              <el-form-item label="部门: " prop="name">
                <span>{{updateUserForm.deptName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份: " prop="name">
                <span v-if="userInfo.roleNameList">{{userInfo.roleNameList[0]}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button type="primary" @click="handleUpdateUserButtnClick">保存</el-button>
        <el-button @click="handleChangePassword" style="margin-right: 10px;">修改密码</el-button>
        <el-dialog title="修改密码" width="40%" :visible.sync="changePasswordDialogVisible">
          <el-form label-position="top" label-width="120px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="旧密码: " required>
                  <el-input v-model="modifyPassWord.password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="新密码: " required>
                  <el-input show-password v-model="modifyPassWord.newPassword"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="24">
                <el-form-item label="确认新密码: " required="">
                  <el-input v-model="modifyPassWord.newPassword"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
          </el-form>
          <el-button @click="changePasswordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleUpdatePosswordButtonClick">保存</el-button>
        </el-dialog>
        <el-button @click="toHomePage">取消</el-button><br><br><br><br>
      </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: '个人中心'
  },
  data () {
    return {
      personalCenterForm: {
        resource: '',
        prop: ''
      },
      changePasswordDialogVisible: false,
      userId: 1,
      updateUserForm: {
        roleNameList: [],
        sex: '',
        userId: '',
        userName: '',
        email: '',
        mobile: '',
        tenantId: 1,
        deptName: '',
        deptId: ''
      },
      modifyPassWord: {
        password: '',
        newPassword: ''
      }
    }
  },
  methods: {
    toHomePage () {
      this.$router.push({ path: '/home' })
    },
    onSubmit () {
      console.log('submit!')
    },
    handleChangePassword () {
      this.changePasswordDialogVisible = true
    },
    getUserInfo () {
      this.$store.dispatch('getSysInfo').then(() => {
        this.updateUserForm.userId = this.userInfo.user.userId
        this.updateUserForm.sex = this.userInfo.user.sex
        this.updateUserForm.userName = this.userInfo.user.userName
        this.updateUserForm.status = this.userInfo.user.status
        this.updateUserForm.mobile = this.userInfo.user.mobile
        this.updateUserForm.email = this.userInfo.user.email
        this.updateUserForm.deptName = this.userInfo.user.deptName
        this.updateUserForm.deptId = this.userInfo.user.deptId
        this.updateUserForm.roleNameList = this.userInfo.roleNameList
        this.updateUserForm.roleIdList = this.userInfo.user.roleIdList
        console.log(this.updateUserForm)
      })
    },
    handleUpdateUserButtnClick () {
      this.updateUserInfo()
    },
    updateUserInfo () {
      this.$store.dispatch('updateSysInfo', this.updateUserForm).then(() => {
        Message({
          message: '修改成功',
          type: 'success'
        })
        // this.$router.push({ path: '/personal-center' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    },
    // 修改密码
    handleUpdatePosswordButtonClick () {
      this.updatePossword()
    },
    updatePossword () {
      this.$store.dispatch('updatePassWord', this.modifyPassWord).then(() => {
        Message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push({ path: '/personal-center' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.sysUser.user
    })
  },
  mounted () {
    // 获取更新用户信息
    this.getUserInfo()
  }
}
</script>
<style scoped>
.el-row {
  line-height: 30px;
}
.personal-center{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.personalCenter-title {
  font-size: 20px;
  color: #333;
  text-align: left;
  line-height: 10px;
}
.dividing-line{
  width: 100%;
  height: 1px;
  background-color: #DCDFE6;
  margin-top: 25px;
}
.personal-center-main{
  margin-top: 25px;
}
</style>
