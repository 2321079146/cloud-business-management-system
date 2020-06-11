<template>
  <div class="view-diary-report">
    <p class="view-diary-report-title">查看详情</p>
    <div class="dividing-line"></div>
    <p><strong class="view-report-title-custom">基本信息</strong></p>
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div style="width:20%;float:right;padding-right:100px;">
        <el-row>
          <el-col :span="4" style="float:right" v-show="isCheckShow">
            <el-button @click="handleClickModifyViewDiaryReport">修改内容</el-button>
          </el-col>
        </el-row><br>
        <el-row v-show="isCheckShow">
          <el-col :span="4" style="float:right">
            <el-popover
              placement="top"
              width="160"
              v-model="visible">
              <p>是否确认审批？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleCheckClick">确定</el-button>
              </div>
              <el-button slot="reference">确认审批</el-button>
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <div style="width:70%;float:left;">
        <el-row>
          <el-col :span="10">
            <el-form-item label="审核状态: " prop="name">
              <span>{{report.statusName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="客户名称: " prop="name">
              <span>{{report.customerName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="客户代表: " prop="name">
              <span>{{report.customerRelName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="收支部门: " prop="name">
              <span>{{report.fianceDeptName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="收支人员: " prop="name">
              <span>{{report.fianceUserName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="收支金额: " prop="name">
              <span>{{report.money}}</span>
            </el-form-item>
          </el-col>
          <el-row>
          <el-col :span="10">
            <el-form-item label="创建时间: " prop="name">
              <span>{{report.createTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="创建人: " prop="name">
              <span>{{report.createUserName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="收支时间: " prop="region">
              <span>{{report.fianceTime | dateYMDHMSFormat}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="摘要: " prop="pass">
              <span>{{report.comment}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="收支账户: " prop="pass">
              <span>{{report.fianceAccountName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="report.checkUserId">
          <el-col :span="10">
            <el-form-item label="审核人: " prop="pass">
              <span>{{report.checkUserName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="审核时间: " prop="pass">
              <span>{{report.checkTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'

export default {
  metaInfo: {
    title: '查看详情'
  },
  data () {
    return {
      fianceId: 0,
      visible: false,
      checkForm: {
        checkUserId: ''
      }
    }
  },
  methods: {
    handleClickModifyViewDiaryReport () {
      this.$router.push({ path: '/modify-view-diary-report', query: { fianceId: this.fianceId } })
    },
    getFiance () {
      this.$store.dispatch('getFianceById', this.fianceId)
    },
    handleCheckClick () {
      this.checkForm.fianceId = this.fianceId
      this.checkForm.checkUserId = this.user.userId
      this.$store.dispatch('check', this.checkForm).then(() => {
        Message({
          type: 'success',
          message: '审批成功'
        })
        this.visible = false
        this.getFiance()
      }).catch(message => {
        Message({
          type: 'error',
          message
        })
      })
    },
    getCurrentUser () {
      this.$store.dispatch('getSysInfo')
    }
  },
  mounted () {
    this.fianceId = this.$route.query.fianceId
    this.getFiance()
    this.getCurrentUser()
    console.log(this.report)
  },
  computed: {
    ...mapState({
      report: state => state.fiance.fiance,
      user: state => state.sysUser.user.user
    }),
    isCheckShow () {
      return this.report.statusName !== '已核算'
    }
  }
}
</script>

<style>
.view-diary-report{
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
