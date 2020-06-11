<template>
  <div class="one-time-accounting">
    <p class="one-time-accounting-title"><span>订单编号: {{agentOrder.baseInformation.task.taskNo}}</span></p>
    <div class="dividing-line"></div>
    <div class="one-time-accounting-main">
      <!-- <div class="agent-flow"></div> -->
      <div>
        <el-card class="box-card">
          <el-row>
            <!-- <el-col :span="3">
              {{agenOrder.baseInformation.task.productName}}
            </el-col> -->
            <el-col :span="24" :offset="10">
              <a-steps :current="0" class="agent-order-steps">
                <template slot="progressDot" slot-scope="{ description }">
                  <span class="ant-steps-icon-dot" :class="getStepsIconClass(description, false, agentOrder.baseInformation.task.taskStatusName)"></span>
                </template>
                <a-step :title="agentOrder.baseInformation.task.createUserName" :description="agentOrder.baseInformation.task.createTime" />
                <!-- <a-step title="服务中" description="" /> -->
                <!-- <a-step :title="getFinish(agentOrder.baseInformation.task)" :description="getFinishDescription(agentOrder.baseInformation.task)"/> -->
              </a-steps>
            </el-col>
          </el-row>
          <el-row :gutter="10" style="margin-top:50px;">
              <el-col :span="4" :offset="4"><i class="green"></i>服务中</el-col>
              <el-col :span="4"><i class="blue"></i>已完成</el-col>
              <el-col :span="4"><i class="red"></i>已终止</el-col>
              <el-col :span="4"><i class="warn"></i>交接中</el-col>
          </el-row>
        </el-card>
      </div>
      <el-collapse  v-model="activeNames" style="margin-top:40px;">
      <div class="">
        <img class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="基础信息" name="1">
          <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="任务状态: ">
                  <span>{{agentOrder.baseInformation.task.taskStatusName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服务金额: ">
                  <span>{{agentOrder.baseInformation.task.price}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="客户名称: ">
                  <span>{{agentOrder.baseInformation.customer.customerName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话: ">
                  <span>{{agentOrder.baseInformation.customer.customerLinkerPhone}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人: ">
                  <span>{{agentOrder.baseInformation.customer.customerLinkerName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户代表: ">
                  <span>{{agentOrder.baseInformation.customer.customerRelUserName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="社会信用代码: ">
                  <span>{{agentOrder.baseInformation.customer.creditCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注: ">
                  <span>{{agentOrder.baseInformation.customer.remark}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="工商专员: " prop="region">
                  <span>{{agentOrder.baseInformation.task.relUserName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="创建人: ">
                  <span>{{agentOrder.baseInformation.customer.createUserName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建时间: ">
                  <span>{{agentOrder.baseInformation.customer.createTime}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <img class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="交接信息: " name="3">
          <el-table
            :data="agentOrder.relList"
            style="width: 100%">
            <el-table-column
              label="操作时间"
              prop="createTime">
            </el-table-column>
            <el-table-column
              label="操作人"
              prop="createUserName">
            </el-table-column>
            <el-table-column
              label="类型"
              prop="type">
            </el-table-column>
            <el-table-column
              label="备注"
              prop="remark">
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <img class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="环节备注: " name="4">
          <el-table
            :data="agentOrder.taskFlowList"
            style="width: 100%">
            <el-table-column
              label="操作时间"
              prop="createTime">
            </el-table-column>
            <el-table-column
              label="负责专员"
              prop="relUserName">
            </el-table-column>
            <el-table-column
              label="备注"
              prop="remark">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </div>
    </el-collapse>
    </div>
    <div class="one-time-accounting-slide">
      <el-row v-if="agentOrder.baseInformation.task.taskStatusValue === '1'">
        <el-button @click="handleCompleteTaskButtonClick">开始填报</el-button>
        <el-dialog :title="agentOrder.baseInformation.task.productName" :visible.sync="carryOutTaskDialogFormVisible" width="40%">
          <el-form>
            <el-form-item label="备注: " required="">
              <el-input v-model="completeTaskForm.remark" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="completeTask">确 定</el-button>
            <el-button @click="carryOutTaskDialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </el-row><br>
      <el-row v-if="agentOrder.baseInformation.task.taskStatusValue === '1'">
        <el-button @click="handleTransferTaskButtonClick">交接任务</el-button>
        <el-dialog title="交接任务: " :visible.sync="HandoverTaskDialogFormVisible" width="40%">
          <el-form>
            <el-form-item label="新负责人" required>
              <el-select placeholder="请选择" v-model="transferTaskForm.receiveUserId" @change="handleReceiveUserSelectChange">
                <el-option
                  v-for="(sysUser, index) in allUser.list"
                  :key="index"
                  :label="sysUser.userName"
                  :value="sysUser.userId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交接备注: ">
              <el-input autocomplete="off" v-model="transferTaskForm.remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="transferTask">确 定</el-button>
            <el-button @click="HandoverTaskDialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </el-row><br>
      <el-row v-if="agentOrder.baseInformation.task.taskStatusValue === '3' && agentOrder.baseInformation.task.transferredUserId === user.user.userId">
        <el-button @click="handleCancelTaskButtonClick">撤回任务</el-button>
        <el-dialog
          title="提示"
          :visible.sync="WithdrawTaskDialogVisible"
          width="30%">
          <span>确定要撤回交接吗?</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cancelTask">确 认</el-button>
            <el-button @click="WithdrawTaskDialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </el-row><br>
      <el-row v-if="agentOrder.baseInformation.task.taskStatusValue === '3' && agentOrder.baseInformation.task.receiveUserId === user.user.userId">
        <el-button  @click="handleRecevieTaskButtonClick">接收任务</el-button>
        <el-dialog title="接收任务" :visible.sync="receiveOuterVisible" width="40%">
          <el-dialog
            width="30%"
            title="退回任务"
            :visible.sync="innerVisible"
            append-to-body>
            <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="退回备注: " prop="desc">
                <el-input v-model="backTaskForm.cancelRemark" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="backTask">确 认</el-button>
                <el-button @click="innerVisible = false">取 消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="交接人: " prop="desc">
              <span>{{ agentOrder.baseInformation.task.transferredUserName }}</span>
            </el-form-item>
            <el-form-item label="交接留言: " prop="desc">
              <el-input v-model="receiveTaskForm.remark"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleBackTaskButtonClick" style="float:left;">退回任务</el-button>
            <el-button type="primary" @click="receiveTask">确 认</el-button>
            <el-button @click="receiveOuterVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </el-row><br>
      <el-row v-if="agentOrder.baseInformation.task.taskStatusValue === '1'">
        <el-button @click="handleStopTaskButtonClick">终止任务</el-button>
        <el-dialog title="请确认是否终止任务?" :visible.sync="terminationTaskDialogFormVisible" width="40%">
          <el-form>
            <el-form-item label="终止原因: " required="">
              <el-input v-model="stopTaskForm.remark" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="terminationTaskDialogFormVisible = false">取 消</el-button>
            <el-button type="danger" @click="stopTask">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
const getMonth = taxDate => new Date(taxDate).getMonth() + 1

export default {
  metaInfo: {
    title: '订单详情'
  },
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      HandoverTaskDialogFormVisible: false,
      WithdrawTaskDialogVisible: false,
      receiveOuterVisible: false,
      innerVisible: false,
      carryOutTaskDialogFormVisible: false,
      terminationTaskDialogFormVisible: false,
      taskId: 0,
      transferTaskForm: {
        taskId: 0,
        receiveUserName: '',
        remark: ''
      },
      getUserListForm: {},
      cancelTaskForm: {
        taskId: 1
      },
      receiveTaskForm: {
        taskId: 1,
        remark: ''
      },
      backTaskForm: {
        taskId: 1,
        cancelRemark: ''
      },
      stopTaskForm: {
        taskId: 1,
        remark: ''
      },
      completeTaskForm: {
        taskId: 1,
        remark: '',
        taxDate: ''
      }
    }
  },
  mounted () {
    this.taskId = this.$route.query.taskId
    this.getAgentOrderDetail()
    this.getAllUser()
  },
  computed: {
    ...mapState({
      agentOrder: state => state.task.task,
      allUser: state => state.sysUser.users,
      user: state => state.sysUser.user
    })
  },
  methods: {
    getNotAgentDate (createTime) {
      return this.$moment(createTime).format('YYYY-MM-DD')
    },
    getFinish ({ taskStatusName }) {
      if (taskStatusName === '交接中') {
        return '交接中'
      }
      if (taskStatusName === '已终止') {
        return '已终止'
      }
      return '已完成'
    },
    getFinishDescription ({ taskStatusName }) {
      if (taskStatusName === '交接中') {
        return '交接中'
      }
      if (taskStatusName === '已终止') {
        return '已终止'
      }
      if (taskStatusName === '已完成') {
        return '已完成'
      }
      return '未开始'
    },
    getStepsIconClass (description, isAgent, status) {
      const taskStatusValue = this.agentOrder.baseInformation.task.taskStatusValue
      switch (taskStatusValue) {
        case '1': {
          return 'custom-process'
        }
        case '2': {
          return 'custom-finish'
        }
        case '3': {
          return 'custom-jiaojie-zhong'
        }
        case '4': {
          return 'custom-stop'
        }
      }
    },
    async getAgentOrderDetail () {
      this.taskId = this.$route.query.taskId
      this.$store.dispatch('getTaskById', this.taskId)
    },
    handleTransferTaskRecevierSelectChange () {},
    handleTransferTaskButtonClick () {
      this.HandoverTaskDialogFormVisible = true
      this.transferTaskForm.taskId = this.taskId
    },
    handleCompleteTaskButtonClick () {
      this.carryOutTaskDialogFormVisible = true
      this.completeTaskForm.taskId = this.taskId
    },
    handleBackTaskButtonClick () {
      this.innerVisible = true
      this.receiveOuterVisible = false
      this.backTaskForm.taskId = this.taskId
    },
    transferTask () {
      this.HandoverTaskDialogFormVisible = false
      this.$store.dispatch('transferTask', this.transferTaskForm).then(() => {
        Message({
          message: '交接成功',
          type: 'success'
        })
        this.transferTaskForm.receiveUserName = ''
        this.transferTaskForm.remark = ''
        this.getAgentOrderDetail()
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    },
    handleCancelTaskButtonClick () {
      this.WithdrawTaskDialogVisible = true
      this.cancelTaskForm.taskId = this.taskId
    },
    handleRecevieTaskButtonClick () {
      this.receiveOuterVisible = true
      this.receiveTaskForm.taskId = this.taskId
    },
    handleStopTaskButtonClick () {
      this.terminationTaskDialogFormVisible = true
      this.stopTaskForm.taskId = this.taskId
    },
    getTaskFlows (taskFlows) {
      const availableTaskFlows = taskFlows.map(({ taxDate }) => ({
        month: getMonth(taxDate),
        monthLabel: `${getMonth(taxDate)} 月`,
        status: '已完成'
      })).sort((x, y) => x.month - y.month)
      return this.year.map(month => {
        const awailableTaskFlow = availableTaskFlows.filter(availableTaskFlow => availableTaskFlow.month === month)[0]
        if (awailableTaskFlow !== undefined) {
          return awailableTaskFlow
        }
        return {
          month,
          monthLabel: `${month} 月`,
          status: '未开始'
        }
      })
    },
    getAllUser () {
      this.$store.dispatch('getUserList', this.getUserListForm)
    },
    // 撤回任务
    cancelTask () {
      this.$store.dispatch('cancelTask', this.cancelTaskForm).then(() => {
        Message({
          message: '撤回成功',
          type: 'success'
        })
        this.WithdrawTaskDialogVisible = false
        this.getAgentOrderDetail()
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
        this.WithdrawTaskDialogVisible = false
      })
    },
    // 接收任务
    receiveTask () {
      this.$store.dispatch('receiveTask', this.receiveTaskForm).then(() => {
        Message({
          message: '接收成功',
          type: 'success'
        })
        this.receiveOuterVisible = false
        this.receiveTaskForm.cancelRemark = ''
        this.getAgentOrderDetail()
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
        this.receiveOuterVisible = false
      })
    },
    // 交接人传值
    getAllUserName (id) {
      return this.allUser.list.filter(({ userId }) => userId === id)[0].userName
    },
    handleReceiveUserSelectChange (id) {
      this.transferTaskForm.receiveUserName = this.getAllUserName(id)
    },
    // 完成记账
    completeTask () {
      const { taxDate } = this.agentOrder.baseInformation.task
      const date = new Date(taxDate)
      this.completeTaskForm.taxDate = `${date.getFullYear()}-${date.getMonth() + 1}`
      this.$store.dispatch('completeTask', this.completeTaskForm).then(() => {
        Message({
          message: '完成记账提交成功',
          type: 'success'
        })
        this.carryOutTaskDialogFormVisible = false
        this.completeTaskForm.remark = ''
        this.getAgentOrderDetail()
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
        this.carryOutTaskDialogFormVisible = false
      })
    },
    backTask () {
      this.$store.dispatch('backTask', this.backTaskForm).then(() => {
        Message({
          message: '退回成功',
          type: 'success'
        })
        this.backTaskForm.remark = ''
        this.innerVisible = false
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
        this.innerVisible = false
      })
    },
    // 终止任务
    stopTask () {
      this.$store.dispatch('stopTask', this.stopTaskForm).then(() => {
        Message({
          message: '成功终止',
          type: 'success'
        })
        this.terminationTaskDialogFormVisible = false
        this.stopTaskForm.remark = ''
        this.getAgentOrderDetail()
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
        this.stopTaskForm.remark = ''
        this.terminationTaskDialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="scss">
.one-time-accounting{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
  height: 150%;
}
.one-time-accounting-main{
  width: 80%;
  float: left;
}
.one-time-accounting-slide{
  width: 18%;
  float: right;
  margin-top: 40px;
}
.dividing-line{
  width: 100%;
  height: 1px;
  background-color: #DCDFE6;
  margin-top: 25px;
}
.agent-flow{
  width: 100%;
  margin-top: 40px;
  background-color: #F2F2F2;
  height: 155px;
}
.base-information-icon{
    margin-top: 13px;
    width: 17px;
    padding-right: 10px;
    float: left;
}

.agent-order-steps, .four-steps {
  .ant-steps-item-description {
    display: none;
  }
  .ant-steps-item-tail {
    top: 5px !important;
    margin: 0 0 0 73px !important;
  }
  .ant-steps-item-icon {
    width: 15px !important;
    height: 15px !important;
  }
  .ant-steps-icon-dot {
    border: 1px solid #e9e9e9;
  }
  .custom-finish {
    background-color: #409EFF !important;
  }
  .custom-process {
    background-color: #00cc01 !important;
  }
  .custom-wait {
    background-color: #fff !important;
  }
  .custom-jiaojie-zhong {
    background-color: #E6A23C !important;
  }
  .custom-stop {
    background-color: #f70707 !important;
  }
}

.agent-order-steps {
  .ant-steps-item-description {
    display: block;
  }
}
.green {
  width:15px;
  height:15px;
  border-radius:50%;
  background-color:#67C23A;
  margin: 2px 5px 0 0px;
  display: inline-block;
}
.blue {
  width:15px;
  height:15px;
  border-radius:50%;
  background-color:#409EFF;
  margin: 2px 5px 0 0px;
  display: inline-block;
}
.red {
  width:15px;
  height:15px;
  border-radius:50%;
  background-color:red;
  margin: 2px 5px 0 0px;
  display: inline-block;
}
.warn {
  width:15px;
  height:15px;
  border-radius:50%;
  background-color:#E6A23C;
  margin: 2px 5px 0 0px;
  display: inline-block;
}
.info {
  width:15px;
  height:15px;
  border-radius:50%;
  background-color:#fff;
  margin: 2px 5px 0 0px;
  display: inline-block;
  border:1px solid rgb(232, 232, 232);
}
</style>
