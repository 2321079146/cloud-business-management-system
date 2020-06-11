<template>
  <div class="new-diary-report">
    <p class="newDiaryReport-page-title">基本信息</p>
      <div class="new-diary-report-main">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称">
                  <el-input v-model="createFianceForm.customerName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户代表">
                    <el-select
                    v-model="createFianceForm.customerRelName"
                    style="width: 100%">
                    <el-option
                      v-for="(user, index) in allUsers"
                      :key="index"
                      :label="user.userName"
                      :value="user.userName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="收支部门" required>
                  <el-select class="account-source-left-custom" v-model="createFianceForm.fianceDeptId" @change="handleDepartmentSelectChange" style="width: 100%">
                    <el-option
                      v-for="(department, index) in departments"
                      :key="index"
                      :label="department.name"
                      :value="department.deptId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收支人员">
                    <el-select
                    v-model="createFianceForm.fianceUserId"
                    @change="handleEditTaskFormFinancialAdviserSelectChange" style="width: 100%">
                    <el-option
                      v-for="(user, index) in allUsers"
                      :key="index"
                      :label="user.userName"
                      :value="user.userId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="收支类型" required>
                    <el-select
                    v-model="createFianceForm.fianceTypeValue"
                    @change="handleiFanceTypeSelectChange" style="width: 100%">
                    <el-option
                    v-for="(fianceType, index)  in fianceTypes"
                    :key="index"
                    :label="fianceType.name"
                    :value="fianceType.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收支时间" required>
                  <span class="block">
                    <el-date-picker
                      v-model="submitDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="收支金额" required>
                  <el-input v-model="createFianceForm.money"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收支账户" required>
                  <el-select
                    v-model="createFianceForm.fianceAccountId"
                    @change="changeFianceAccount"
                    placeholder="请选择">
                    <el-option
                      v-for="item in fianceAccountList"
                      :key="item.tenantCollectAccountId"
                      :label="item.accountName"
                      :value="item.tenantCollectAccountId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否需要其他人审核" required>
                  <el-radio-group v-model="radio" >
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12" required>
                <el-form-item label="审核人:" v-show="radio === 1" required="">
                  <el-select
                    v-model="createFianceForm.checkUserId"
                    @change="handleEditCheckUserName" style="width: 100%">
                    <el-option
                      v-for="user in allUsers"
                      :key="user.userId"
                      :label="user.userName"
                      :value="user.userId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="摘要">
                  <el-input type="textarea" v-model="createFianceForm.comment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 3.4 将 3.3 定义的方法绑定到 click 事件上 -->
            <el-button type="primary" :loading="isDiaryReport" @click="handleCreateFianceButtonClick">保 存</el-button>
            <a href="javascript:history.go(-1)"><el-button>取 消</el-button></a>
          </el-form>
      </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: '新建收支'
  },
  data () {
    return {
      // 3.1 先写创建日记账单所需要的 form
      // 3.2 将这个 form 和上面 html 的输入框了绑定
      submitDate: '',
      createFianceForm: {
        customerName: '',
        customerRelName: '',
        fianceUserId: '',
        fianceUserName: '',
        fianceDeptId: '',
        fianceDeptName: '',
        money: '',
        comment: '',
        fianceTypeValue: '',
        fianceTypeName: '',
        fianceTime: '',
        fianceAccountId: '',
        fianceAccountName: ''
      },
      fianceTypes: [
        {
          name: '支出',
          value: '1'
        },
        {
          name: '收款',
          value: '0'
        }
      ],
      radio: 1,
      isDiaryReport: false
    }
  },
  methods: {
    changeFianceAccount (id) {
      this.createFianceForm.fianceAccountName = this.fianceAccountList.filter(({ tenantCollectAccountId }) => tenantCollectAccountId === id)[0].accountName
    },
    getCollectAccounts () {
      this.$store.dispatch('getTenantAccountList', this.getTenantAccountListForm)
    },
    getDepartmentName (id) {
      return this.departments.filter(({ deptId }) => deptId === id)[0].name
    },
    getUserName (id) {
      return this.allUsers.filter(({ userId }) => userId === id)[0].userName
    },
    handleDepartmentSelectChange (id) {
      this.createFianceForm.fianceDeptName = this.getDepartmentName(id)
    },
    getFianceTypeName (value) {
      if (value === '0') {
        return '收款'
      }
      return '支出'
    },
    handleiFanceTypeSelectChange (value) {
      this.createFianceForm.fianceTypeName = this.getFianceTypeName(value)
    },
    // 3.3 在 methods 中定一个方法
    handleCreateFianceButtonClick () {
      // 调用 3.5 的创建方法
      this.createFiance()
    },
    getDepartments () {
      this.$store.dispatch('getDeptList')
    },
    // 3.5 在 methods 中定一个方法用来调用 vuex 中 actions 中的方法
    createFiance () {
      this.isDiaryReport = true
      const date = this.submitDate
      console.log(date)
      this.createFianceForm.fianceTime = this.$moment(date).format('YYYY-MM-DD')
      this.$store.dispatch('createFiance', this.createFianceForm).then(() => {
        Message({
          message: '保存成功',
          type: 'success'
        })
        this.isDiaryReport = false
        this.$router.push({ path: '/diary-report' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
        this.isDiaryReport = false
      })
    },
    // 获取所有人员名称
    getUsers () {
      this.$store.dispatch('getUserList')
    },
    handleEditTaskFormFinancialAdviserSelectChange (id) {
      this.createFianceForm.fianceUserName = this.getUserName(id)
    },
    handleEditCheckUserName (id) {
      this.createFianceForm.checkUserName = this.getUserName(id)
    },
    isShowCheckUser () {
      if (this.createFianceForm.checkUserId === '1') {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    this.getDepartments()
    this.getUsers()
    this.getCollectAccounts()
  },
  computed: {
    ...mapState({
      departments: state => state.department.depts,
      // 获取所有用户
      allUsers: state => state.sysUser.users.list,
      fianceAccountList: state => state.tenantCollectAccount.tenantAccounts
    })
  }
}
</script>

<style>
.new-diary-report{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.newDiaryReport-page-title{
  font-size: 20px;
  color: #333;
  text-align: left;
  line-height: 10px;
}
.new-diary-report-main{
  margin-top: 25px;
}
</style>
