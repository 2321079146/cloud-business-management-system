<template>
  <div class="view-account">
    <el-row>
      <el-col :span="20">
        <p class="view-account-title">{{account.customerName}}</p>
       </el-col>
      <el-col :span="4">
        <el-button @click="handleModifyViewAccount">修改内容</el-button>
      </el-col>
    </el-row>
    <div class="dividing-line"></div>
    <el-collapse v-model="activeNames">
      <div class="">
        <img class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="基础信息" name="1">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-row :gutter="1">
              <el-col :span="20">
                <el-button type="primary" round>{{account.customerStatusName}}</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户名称: ">
                  <span>{{account.customerName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人: ">
                  <span>{{account.customerLinkerName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="社会信用代码: ">
                  <span>{{account.creditCode}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话: ">
                  <span>{{account.customerLinkerPhone}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业电话: ">
                  <span>{{account.customerBusinessPhone}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户等级: ">
                  <span>{{account.customerLevelName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系地址: ">
                  <span>{{account.customerAddress}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业邮箱: ">
                  <span>{{account.customerBusinessEmail}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户来源: ">
                  <span>{{account.customerFromWay}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户代表: ">
                  <span>{{account.customerRelUserName}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="创建人: ">
                  <span>{{account.createUserName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建日期: ">
                  <span>{{account.createTime}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" v-show="isRoyaltyCoefficientShow">
                <el-form-item label="提成系数：">
                  <span>{{account.royaltyCoefficient}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="备注: ">
                  <span>{{account.remark}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <img class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="文档资料: " name="2">
          <el-form label-width="120px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="身份证复件: ">
                  <!-- <img v-for="(url, index) in getImageUrls('身份证复印件图片')" :key="index" :src="url" style="width: 100px;"> -->
                  <el-upload
                   action
                   disabled
                  :on-preview="handlePreviewPicture"
                  :file-list="uploadFiles.idCardImgList"
                  list-type="picture">
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照复件: ">
                  <el-upload
                    disabled
                    action
                  :on-preview="handlePreviewPicture"
                  :file-list="uploadFiles.businessImgList"
                  list-type="picture">
                </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同原件: ">
                <el-upload
                    action
                    disabled
                  :on-preview="handlePreviewPicture"
                  :file-list="uploadFiles.contractImgList"
                  list-type="picture">
                </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <img v-show="isAgentReport" class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="财税信息" name="3">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="24">
                <el-button type="primary">代理记账</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="月服务费: ">
                  <span v-if="account.newestTask && account.newestTask.price">{{account.newestTask.price }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付费周期: ">
                  <span>{{ account.newestTask ? account.newestTask.payCycle : ''}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="服务周期: ">
                  <span>{{ account.newestTask ? account.newestTask.number : '' }}月</span>
                </el-form-item>
              </el-col>
               <el-col :span="8">
                <el-form-item label="剩余服务月: ">
                  <span>{{ account.newestTask ? getLeftMonths(account.newestTask) : '' }}月</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="服务开始月: ">
                  <span v-if="account.newestTask && account.newestTask.serviceStartMonth">{{account.newestTask.serviceStartMonth | dateYM}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前报税期: ">
                  <span v-if="account.newestTask && account.newestTask.taxDate">{{account.newestTask.taxDate | dateYM }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <img class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="流程列表: " name="4">
          <p style="float:right;font-size:20px">总金额: ￥{{getAddMoney()}}</p>
          <el-table
            :data="account.taskList"
            style="width: 100%">
            <el-table-column
              type="index" label="序号">
            </el-table-column>
            <el-table-column
              prop="productName"
              :show-overflow-tooltip="true"
              label="产品名称">
            </el-table-column>
            <el-table-column
              prop="taskNo"
              :show-overflow-tooltip="true"
              label="订单编号">
            </el-table-column>
            <el-table-column
              prop="taskStatusName"
              label="服务状态">
            </el-table-column>
            <el-table-column
              prop="completeProgress"
              label="流程进度">
            </el-table-column>
            <el-table-column
              prop="price"
              label="服务金额">
            </el-table-column>
            <el-table-column
              prop="relUserName"
              label="负责人">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="handleEditTaskButtonClick(scope.row)">查看</el-button>
                </template>
            </el-table-column>
          </el-table>
          <el-dialog
            v-if="task !== null"
            :visible="editTaskDialogVisible"
            width="50%"
            append-to-body>
            <el-form>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="产品名称：">
                    <span>{{task.productName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="财税顾问: " v-show="task.productName === '代理记账'">
                    <span>{{task.relUserName}}</span>
                  </el-form-item>
                  <el-form-item label="负责人: " v-show="task.productName !== '代理记账'">
                    <span>{{task.relUserName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="服务单价: ">
                    <span>{{task.price}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="会计助理: " v-show="task.productName === '代理记账'">
                    <span>{{task.relHelpUserName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="服务周期: " v-show="task.productName === '代理记账'">
                    <span>{{task.number}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="付费方式: " v-show="task.productName === '代理记账'">
                    <span>{{task.payCycle}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editTaskDialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        </el-collapse-item>
        <img v-show="isAgentReport" class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="代帐收费: " name="5" v-show="isAgentReport">
          <el-table
            style="width: 100%">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="date"
              label="产品名称">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              label="订单编号">
            </el-table-column>
            <el-table-column
              prop="address"
              label="服务状态">
            </el-table-column>
            <el-table-column
              prop="address"
              label="流程进度">
            </el-table-column>
            <el-table-column
              prop="address"
              label="服务金额">
            </el-table-column>
            <el-table-column
              prop="address"
              label="负责人">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template>
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="add-products-model">
            <el-dialog title="代帐报表" width="40%">
              <div slot="footer" class="dialog-footer">
                <el-button type="primary">确认</el-button>
                <el-button>取消</el-button>
              </div>
            </el-dialog>
             <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </el-collapse-item>
      </div>
    </el-collapse>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: '客户详情',
    meta: [
      {
        name: 'referrer',
        content: 'no-referrer'
      }
    ]
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      uploadFiles: {
        idCardImgList: [],
        businessImgList: [],
        contractImgList: []
      },
      customerId: '',
      activeNames: ['1', '2', '3', '4', '5'],
      idCardImages: [''],
      businessLicenseImages: [''],
      contractImages: [''],
      processList: [],
      editTaskDialogVisible: false,
      isAngentDetail: false,
      task: null,
      fileList: []
    }
  },
  mounted () {
    this.customerId = this.$route.query.customerId
    this.getCustomer()
    this.getUsers()
    this.getProducts()
    this.initFileList()
  },
  computed: {
    isRoyaltyCoefficientShow () {
      return this.isTasksContainAgentReport()
    },
    isAgentReport () {
      return this.account.taskList.filter(process => process.productName === '代理记账').length > 0
    },
    ...mapState({
      account: state => state.customer.customer,
      users: state => state.sysUser.users.list,
      products: state => state.product.products.page.list
    })
  },
  methods: {
    // 预览图片
    handlePreviewPicture (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件列表初始化
    initFileList () {
      for (const item of this.account.fileList) {
        const picture = {
          name: item.fileType,
          url: item.fileUrl.replace('/data/wwwroot/', 'http://'),
          id: item.fileId
        }
        if (picture.name === '身份证复印件图片') {
          this.uploadFiles.idCardImgList.push(picture)
        } else if (picture.name === '合同原件') {
          this.uploadFiles.contractImgList.push(picture)
        } else if (picture.name === '营业执照复印件') {
          this.uploadFiles.businessImgList.push(picture)
        }
      }
    },
    // 累加
    getAddMoney () {
      return this.account.taskList.map(({ price, number }) => price * number).reduce((x, y) => x + y)
    },
    getImageUrls (type) {
      const files = this.account.fileList
      if (files) {
        return this
          .account
          .fileList
          .filter(({ fileType }) => fileType === type)
          .map(({ fileUrl }) => `https://${fileUrl.replace('/data/wwwroot/', '')}`)
      }
      return []
    },
    handleEditTaskFormAccountingAssistantSelectChange (id) {
      this.account.taskList.relHelpUserName = this.getUserName(id)
    },
    handleAddTaskFormFinancialAdviserSelectChange (id) {
      this.account.taskList.relUserName = this.getUserName(id)
    },
    isTasksContainAgentReport () {
      return this.account.taskList.filter(({ productName }) => productName === '代理记账').length > 0
    },
    getProducts () {
      this.$store.dispatch('getProducts', this.getProductsForm)
    },
    // 根据 ID 获取产品
    getProductById (id) {
      return this.products.filter(({ productId }) => productId === id)[0]
    },
    getProductNameById (id) {
      return this.getProductById(id).productName
    },
    // 处理添加产品产品名称选择框改变事件
    handleAddTaskFormProductSelectChange (id) {
      // 根据产品 ID 获取产品名称并赋值给添加产品表单对应字段
      const productName = this.getProductNameById(id)
      if (productName === '代理记账') {
        this.isAngentDetail = false
      } else {
        this.isAngentDetail = true
      }
      this.account.productName = this.getProductNameById(id)
    },
    handleViewAgentClick (row) {
      this.$router.push({ path: '/agent-bookkeeping', query: { accountName: row.accountName } })
    },
    handleModifyViewAccount () {
      this.$router.push({ path: '/modify-account-detail', query: { customerId: this.customerId } })
    },
    // 写一个获取id 得方法
    async getCustomer () {
      await this.$store.dispatch('getCustomerById', this.customerId)
    },
    getLeftGifts (newestTask) {
      const { giftNumber, number, completeCount } = newestTask
      if (completeCount < number) {
        return giftNumber
      }
      return giftNumber - (number - completeCount)
    },
    getLeftMonths (newestTask) {
      const { number, completeCount } = newestTask
      return number - completeCount
    },
    handleEditTaskButtonClick ({ taskId, productName }) {
      this
        .$router
        .push({ path: productName === '代理记账' ? '/agent-bookkeeping' : '/one-time-accounting', query: { taskId } })
    },
    getUsers () {
      this.$store.dispatch('getUserList', this.getUsersForm)
    }
  }
}
</script>

<style scoped>
.view-account{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
  height: 150%;
}
.view-account-title{
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
.base-information-icon {
    margin-top: 13px;
    width: 17px;
    padding-right: 10px;
    float: left;
}
.el-form-item {
    margin-bottom: 0px;
}
</style>
