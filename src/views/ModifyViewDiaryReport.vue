<template>
  <div class="modify-view-diary-report">
    <p class="view-diary-report-title">收支详情</p>
    <div class="dividing-line"></div>
    <p><strong class="view-report-title-custom">基本信息</strong></p>
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="审核状态: ">
            <span >{{report.statusName}}</span>
          </el-form-item>
        </el-col>
      </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="客户名称: ">
                  <el-input v-model="updateFianceForm.customerName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="客户代表">
                    <el-select
                    v-model="updateFianceForm.customerRelName"
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
              <el-col :span="10">
                <el-form-item label="收支部门: ">
                  <el-select class="account-source-left-custom" v-model="updateFianceForm.fianceDeptId" @change="handleDepartmentSelectChange" style="width: 100%">
                    <el-option
                      v-for="(department, index) in departments"
                      :key="index"
                      :label="department.name"
                      :value="department.deptId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="收支人员: ">
                    <el-select
                    style="width: 100%"
                    v-model="updateFianceForm.fianceUserId"
                    @change="handleEditTaskFormFinancialAdviserSelectChange">
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
              <el-col :span="10">
                <el-form-item label="收支类型" required>
                  <el-input v-model="report.fianceTypeName" disabled></el-input>
                    <!-- <el-select disabled
                    v-model="updateFianceForm.fianceTypeValue"
                    @change="handleiFanceTypeSelectChange" style="width: 100%">
                    <el-option
                    v-for="(fianceType, index)  in fianceTypes"
                    :key="index"
                    :label="fianceType.name"
                    :value="fianceType.value"></el-option>
                  </el-select> -->
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="收支时间" required>
                  <el-date-picker v-model="report.fianceTime" value-format="yyyy-MM-dd" disabled></el-date-picker>
                  <!-- <span class="block">
                    <el-date-picker
                      v-model="submitDate"
                      type="date"
                      disabled
                      placeholder="选择日期">
                    </el-date-picker>
                  </span> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="收支金额: ">
                  <el-input v-model="report.money" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="收支账户" required>
                  <el-select
                    v-model="updateFianceForm.fianceAccountId"
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
              <el-col :span="10">
                <el-form-item label="创建人: ">
                  <el-input v-model="updateFianceForm.createUserName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="创建时间: ">
                  <el-input v-model="report.createTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="摘要: " prop="pass">
                  <el-input type="textarea" v-model="updateFianceForm.comment"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="是否需要其他人审核" required>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="10" required>
                <el-form-item label="审核人:" v-show="radio === 1" required="">
                  <el-select
                    v-model="updateFianceForm.checkUserId"
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
          </el-form>
          <el-button type="primary" @click="handleUpdateFianceButtonClick">确 认</el-button>
          <el-button  @click="handleCancelClick">取 消</el-button>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: '修改收支'
  },
  data () {
    return {
      radio: 1,
      // fianceId: this.$route.query.fianceId,
      fianceId: 1,
      updateFianceForm: {
        fianceId: 0,
        customerName: '',
        customerRelName: '',
        fianceDeptId: 1,
        fianceDeptName: '',
        fianceUserId: 2,
        fianceUserName: '',
        money: '',
        balance: '',
        createUserName: '',
        comment: '',
        fianceTime: '',
        checkUserId: '',
        checkUserName: '',
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
      submitDate: ''
    }
  },
  methods: {
    changeFianceAccount (id) {
      this.updateFianceForm.fianceAccountName = this.fianceAccountList.filter(({ tenantCollectAccountId }) => tenantCollectAccountId === id)[0].accountName
    },
    getCollectAccounts () {
      this.$store.dispatch('getTenantAccountList', this.getTenantAccountListForm)
    },
    handleEditCheckUserName (id) {
      this.updateFianceForm.checkUserName = this.allUsers.filter(({ userId }) => userId === id)[0].userName
    },
    handleCancelClick () {
      this.$router.push({ path: '/diary-report' })
    },
    getFiance () {
      this.$store.dispatch('getFianceById', this.fianceId).then(() => {
        console.log(this.report)
        this.updateFianceForm.fianceId = this.report.fianceId
        this.updateFianceForm.checkUserId = this.report.checkUserId
        this.updateFianceForm.checkUserName = this.report.checkUserName
        this.updateFianceForm.customerName = this.report.customerName
        this.updateFianceForm.customerRelName = this.report.customerRelName
        this.updateFianceForm.fianceDeptName = this.report.fianceDeptName
        this.updateFianceForm.fianceDeptId = this.report.fianceDeptId
        this.updateFianceForm.fianceUserName = this.report.fianceUserName
        this.updateFianceForm.fianceUserId = this.report.fianceUserId
        this.updateFianceForm.money = this.report.money
        this.updateFianceForm.balance = this.report.balance
        this.updateFianceForm.createUserName = this.report.createUserName
        // this.updateFianceForm.createTime = this.report.createTime
        this.updateFianceForm.fianceTime = this.report.fianceTime
        this.updateFianceForm.comment = this.report.comment
        this.updateFianceForm.fianceAccountId = this.report.fianceAccountId
        this.updateFianceForm.fianceAccountName = this.report.fianceAccountName
      })
    },
    handleUpdateFianceButtonClick () {
      this.modifyFiance()
    },
    handleDepartmentSelectChange (id) {
      this.updateFianceForm.fianceDeptName = this.getDepartmentName(id)
    },
    handleEditTaskFormFinancialAdviserSelectChange (id) {
      this.updateFianceForm.fianceUserName = this.getUsers(id)
    },
    getFianceTypeName (value) {
      if (value === '0') {
        return '收款'
      }
      return '支出'
    },
    handleiFanceTypeSelectChange (value) {
      this.updateFianceForm.fianceTypeName = this.getFianceTypeName(value)
    },
    getUsers () {
      this.$store.dispatch('getUserList')
    },
    getDepartments () {
      this.$store.dispatch('getDeptList')
    },
    modifyFiance () {
      if (this.radio === '2') {
        this.updateFianceForm.checkUserId = ''
        this.updateFianceForm.checkUserName = ''
      }
      this.updateFianceForm.fianceTime = this.$moment(this.updateFianceForm.fianceTime).format('YYYY-MM-DD')
      this.$store.dispatch('updateFiance', this.updateFianceForm).then(() => {
        Message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push({ path: '/diary-report' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    }
  },
  mounted () {
    this.getDepartments()
    this.getUsers()
    this.fianceId = this.$route.query.fianceId
    this.getFiance()
    this.getCollectAccounts()
  },
  computed: {
    ...mapState({
      report: state => state.fiance.fiance,
      departments: state => state.department.depts,
      // 获取所有用户
      allUsers: state => state.sysUser.users.list,
      fianceAccountList: state => state.tenantCollectAccount.tenantAccounts
    })
  }
}
</script>

<style>
.modify-view-diary-report{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.view-diary-report-title{
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
.view-report-title-custom{
  line-height: 50px;
}
</style>
