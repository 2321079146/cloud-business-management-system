<template>
  <div class="modify-view-account">
    <p class="modify-view-account-title">修改信息</p>
    <div class="dividing-line"></div>
    <el-collapse v-model="activeNames">
      <div>
        <img class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
        <el-collapse-item title="基础信息" name="1">
          <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="20">
                <el-button type="primary" round>{{updateCustomerForm.customerStatusName}}</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户名称: " required>
                  <el-input v-model="updateCustomerForm.customerName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人: " required>
                  <el-input v-model="updateCustomerForm.customerLinkerName" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="社会信用代码: " required>
                  <el-input v-model="updateCustomerForm.creditCode" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话: " required>
                  <el-input v-model="updateCustomerForm.customerLinkerPhone" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="企业电话: ">
                  <el-input v-model="updateCustomerForm.customerBusinessPhone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户等级: ">
                  <el-select v-model="updateCustomerForm.customerLevelValue" style="width: 100%;" @change="handleCustomerLevelSelectChange">
                  <el-option
                    v-for="(customerLevel, index)  in customerLevels"
                    :key="index"
                    :label="customerLevel.name"
                    :value="customerLevel.value">
                  </el-option>
                </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联系地址: ">
                  <el-input v-model="updateCustomerForm.customerAddress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="企业邮箱: ">
                  <el-input v-model="updateCustomerForm.customerBusinessEmail"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户来源: " required>
                  <el-select
                  style="width: 50%;"
                  v-model="updateCustomerForm.customerFromWay"
                  @change="changeCustomerFromWay">
                  <el-option
                    v-for="(customerSource, index) in customerSources"
                    :key="index"
                    :label="customerSource"
                    :value="customerSource">
                  </el-option>
                </el-select>
                <el-select
                  style="width: 50%;"
                  v-model="updateCustomerForm.customerFromDetail">
                  <el-option
                    v-for="(customerSourceDetail, index) in customerSourceDetails"
                    :key="index"
                    :value="customerSourceDetail">
                  </el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户代表: " required>
                  <el-select
                    v-model="updateCustomerForm.customerRelUserId"
                    @change="changCustomerRelUserName" style="width: 100%;">
                    <el-option
                      v-for="user in users"
                      :key="user.userId"
                      :label="user.userName"
                      :value="user.userId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12" v-show="isRoyaltyCoefficientShow">
                <el-form-item label="提成系数：" required>
                  <el-input v-model="updateCustomerForm.royaltyCoefficient"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注: ">
                  <el-input v-model="updateCustomerForm.remark"></el-input>
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
                <el-form-item label="身份证复件: " prop="name" required>
                  <el-upload
                  action
                  :http-request="handleIdCardCopyUploadHttpRequest"
                  :file-list="uploadFiles.idCardImgList"
                  :on-preview="handlePreviewPicture"
                  :on-remove="handleRemovePicture"
                  list-type="picture">
                  <el-button size="small" type="primary">选择上传文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照复件: " prop="name" required>
                  <el-upload
                  action
                  :file-list="uploadFiles.businessImgList"
                  :on-remove="handleRemovePicture"
                  :on-preview="handlePreviewPicture"
                  :http-request="handleBusinessLicenseCopyImageUploadHttpRequest"
                  list-type="picture">
                  <el-button size="small" type="primary">选择上传文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同原件: " prop="name" required>
                <el-upload
                  action
                  :file-list="uploadFiles.contractImgList"
                  :on-remove="handleRemovePicture"
                  :on-preview="handlePreviewPicture"
                  :http-request="handleContractloadHttpRequest"
                  list-type="picture">
                  <el-button size="small" type="primary">选择上传文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <img class="base-information-icon" src="../assets/images/newAccountPage/arrow.png" alt="">
              <el-collapse-item
              title="订单列表"
              name="task-table">
                <div class="tasks-table">
                  <el-table
                    :data="taskList">
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column label="产品名称" prop="productName"></el-table-column>
                    <el-table-column label="服务单价" prop="price"></el-table-column>
                    <el-table-column label="服务周期" prop="number" v-if="isRoyaltyCoefficientShow"></el-table-column>
                    <el-table-column label="总额">
                      <template slot-scope="scope">
                        {{ scope.row.price * scope.row.number }}
                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleEditTaskButtonClick(scope.$index)">编辑</el-button>
                        <el-dialog
                          :visible.sync="editTaskDialogVisible"
                          width="50%">
                          <el-form>
                            <el-row :gutter="20">
                              <el-col :span="12">
                                <el-form-item label="产品名称：">
                                    <el-select
                                      disabled
                                      v-model="updateTaskForm.productName">
                                    </el-select>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="财税顾问：" v-show="!isAngentDetail">
                                  <el-select
                                    v-model="updateTaskForm.relUserId"
                                    @change="handleupdateTaskFormFinancialAdviserSelectChange">
                                    <el-option
                                      v-for="user in users"
                                      :key="user.userId"
                                      :label="user.userName"
                                      :value="user.userId">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                                <el-form-item label="负责人：" v-show="isAngentDetail">
                                  <el-select
                                  v-model="updateTaskForm.relUserId"
                                  @change="handleUpdateTaskFormFinancialAdviserSelectChange">
                                  <el-option
                                    v-for="user in users"
                                    :key="user.userId"
                                    :label="user.userName"
                                    :value="user.userId">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                              </el-col>
                            </el-row>
                            <el-row :gutter="20">
                              <el-col :span="12">
                                <el-form-item label="服务单价：">
                                  <el-input-number
                                    :min="0.01"
                                    :step="0.01"
                                    v-model="updateTaskForm.price">
                                  </el-input-number>
                                </el-form-item>
                              </el-col>
                              <el-col :span="12">
                                <el-form-item label="会计助理：" v-show="!isAngentDetail">
                                  <el-select
                                    v-model="updateTaskForm.relHelpUserId"
                                    @change="handleupdateTaskFormAccountingAssistantSelectChange">
                                    <el-option
                                      v-for="user in users"
                                      :key="user.userId"
                                      :label="user.userName"
                                      :value="user.userId">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                            </el-row>
                            <el-row :gutter="20">
                              <el-col :span="12">
                                <el-form-item label="服务周期：" v-show="!isAngentDetail">
                                  <el-input-number
                                    :min="1"
                                    :step="1"
                                    v-model="updateTaskForm.number">
                                  </el-input-number>
                                </el-form-item>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col>
                                <el-form-item label="付费方式：" v-show="!isAngentDetail">
                                  <el-select
                                    v-model="updateTaskForm.payCycle">
                                    <el-option
                                      v-for="(paymentMethod, index) in paymentMethods"
                                      :key="index"
                                      :label="paymentMethod"
                                      :value="paymentMethod">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                            </el-row>
                          </el-form>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="editTaskDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="updateTask()">确 定</el-button>
                          </span>
                        </el-dialog>
                        <el-button size="mini" type="text" @click="handleDeleteTaskButtonClick(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button type="primary" style="width: 100%;" @click="handleAddTaskButtonClick">添加产品</el-button>
                  <el-dialog
                    :visible.sync="addTaskDialogVisible"
                    width="50%">
                    <el-form>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="产品名称：">
                            <el-select
                              v-model="addTaskForm.productId"
                              @change="handleAddTaskFormProductSelectChange">
                              <el-option
                                v-for="product in products"
                                :key="product.productId"
                                :label="product.productName"
                                :value="product.productId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="财税顾问：" v-show="!isAngentDetail">
                            <el-select
                              v-model="addTaskForm.relUserId"
                              @change="handleAddTaskFormFinancialAdviserSelectChange">
                              <el-option
                                v-for="user in users"
                                :key="user.userId"
                                :label="user.userName"
                                :value="user.userId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="负责人：" v-show="isAngentDetail">
                            <el-select
                              v-model="addTaskForm.relUserId"
                              @change="handleAddTaskFormFinancialAdviserSelectChange">
                              <el-option
                                v-for="user in users"
                                :key="user.userId"
                                :label="user.userName"
                                :value="user.userId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="服务单价：">
                            <el-input-number
                              :min="0.01"
                              :step="0.01"
                              v-model="addTaskForm.price">
                            </el-input-number>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="会计助理：" v-show="!isAngentDetail">
                            <el-select
                              v-model="addTaskForm.relHelpUserId"
                              @change="handleAddTaskFormAccountingAssistantSelectChange">
                              <el-option
                                v-for="user in users"
                                :key="user.userId"
                                :label="user.userName"
                                :value="user.userId">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="服务周期：" v-show="!isAngentDetail">
                            <el-input-number
                              :min="1"
                              :step="1"
                              v-model="addTaskForm.number">
                            </el-input-number>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="付费方式：" v-show="!isAngentDetail">
                            <el-select
                              v-model="addTaskForm.payCycle">
                              <el-option
                                v-for="(paymentMethod, index) in paymentMethods"
                                :key="index"
                                :label="paymentMethod"
                                :value="paymentMethod">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="addTaskDialogVisible = false" >取 消</el-button>
                      <el-button type="primary" @click="handleAddTaskDialogOkButtonClick">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                </div>
                <el-row>
                  <el-col>合计: {{getAddMoney}}</el-col>
                </el-row>
      </el-collapse-item>
      </div>
    </el-collapse>
    <div><br>
      <el-button type="primary" @click="handleUpdateCustomerButtonClick">保 存</el-button>
      <el-button @click="handleCancelCustomerButtonClick">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: '修改详情',
    meta: [
      {
        name: 'referrer',
        content: 'no-referrer'
      }
    ]
  },
  data () {
    return {
      options: [{
        value: '选项1'
      }, {
        value: '选项2'
      }, {
        value: '选项3'
      }, {
        value: '选项4'
      }, {
        value: '北京烤鸭'
      }],
      value: '北京烤鸭',
      getChannelsForm: {
        limit: 10,
        page: 1
      },
      customerSourceDetails: [],
      customerSources: [
        '老客户',
        '渠道',
        '同事'
      ],
      customerLevels: [
        {
          name: '普通',
          value: '0'
        },
        {
          name: 'VIP',
          value: '1'
        }
      ],
      dialogImageUrl: '',
      dialogVisible: false,
      customerId: 1,
      activeNames: ['1', '2', 'task-table'],
      idCardImages: [''],
      businessLicenseImages: [''],
      contractImages: [''],
      addTaskDialogVisible: false,
      addTaskForm: {
        // 产品名称
        productId: '',
        productName: '',
        // 财税顾问
        relUserId: '',
        relUserName: '',
        // 服务单价
        price: '',
        // 会计助理
        relHelpUserId: '',
        relHelpUserName: '',
        // 服务周期
        number: '',
        // 付费方式
        payCycle: '',
        longTerm: '0'
      },
      isAngentDetail: false,
      updateTaskForm: {
        // 产品名称
        productId: '',
        productName: '',
        // 财税顾问
        relUserId: '',
        relUserName: '',
        // 服务单价
        price: '',
        // 会计助理
        relHelpUserId: '',
        relHelpUserName: '',
        // 服务周期
        number: '',
        // 付费方式
        payCycle: '',
        longTerm: '0'
      },
      updateCustomerForm: {
        customerName: '',
        customerLinkerName: '',
        creditCode: '',
        customerLinkerPhone: '',
        customerBusinessPhone: '',
        customerLevelValue: '',
        customerLevelName: '',
        customerRelUserId: '',
        customerRelUserName: '',
        customerFromWay: '',
        customerFromDetail: '',
        royaltyCoefficient: '',
        remark: '',
        customerAddress: '',
        customerBusinessEmail: ''
      },
      taskList: [],
      addProductDialogVisible: false,
      editTaskDialogVisible: false,
      paymentMethods: [
        '月付',
        '季付',
        '年付'
      ],
      getUsersForm: {
        limit: 10,
        page: 1
      },
      // 上传文件
      idCardCopyFiles: [],
      uploadFiles: {
        idCardImgList: [],
        businessImgList: [],
        contractImgList: []
      },
      idCardCopyUploadForm: {
        type: 'customer',
        dataId: 10,
        fileNameInfo: '身份证复印件图片',
        fileType: '身份证复印件图片'
      },
      businessLicenseCopyImageUploadForm: {
        type: 'customer',
        dataId: 10,
        fileNameInfo: '营业执照复印件',
        fileType: '营业执照复印件'
      },
      handleContractloadHttpRequestForm: {
        type: 'customer',
        dataId: 10,
        fileNameInfo: '合同原件',
        fileType: '合同原件'
      }
    }
  },
  methods: {
    changCustomerRelUserName (data) {
      var user = this.users.find((item) => {
        return item.userId === data
      })
      this.updateCustomerForm.customerRelUserName = user.userName
    },
    initCustomerFromDetail (customerSource) {
      switch (customerSource) {
        case '老客户': {
          this.customerSourceDetails = this.allCustomers.map(({ customerName }) => customerName)
          break
        }
        case '渠道': {
          this.customerSourceDetails = this.channels.map(({ name }) => name)
          break
        }
        case '同事': {
          this.customerSourceDetails = this.users.map(({ userName }) => userName)
          break
        }
      }
    },
    changeCustomerFromWay (customerSource) {
      this.initCustomerFromDetail(customerSource)
      // 清空之前的数据
      this.updateCustomerForm.customerFromDetail = ''
    },
    handleCustomerLevelSelectChange (customerLevel) {
      var level = this.customerLevels.find((item) => {
        return item.value === customerLevel
      })
      this.updateCustomerForm.customerLevelName = level.name
    },
    // 预览图片
    handlePreviewPicture (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除图片
    handleRemovePicture (file) {
      const fileId = file.id
      this.$store.dispatch('removeFile', fileId).then(() => {
        Message({
          message: '删除成功',
          type: 'success'
        })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
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
    handleCancelCustomerButtonClick () {
      this.$router.push({ path: '/account' })
    },
    // 上传文件的
    handleIdCardCopyUploadHttpRequest ({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      this.idCardCopyUpload(formData)
    },
    handleBusinessLicenseCopyImageUploadHttpRequest ({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      this.businessLicenseCopyImageUpload(formData)
    },
    handleContractloadHttpRequest ({ file }) {
      const formData = new FormData()
      formData.append('file', file)
      this.contractload(formData)
    },
    idCardCopyUpload (formData) {
      this.idCardCopyUploadForm.dataId = this.account.customerId
      this.$store.dispatch('uploadFile', { formData, uploadFileForm: this.idCardCopyUploadForm }).then(file => {
        Message({
          message: '上传成功',
          type: 'success'
        })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    },
    businessLicenseCopyImageUpload (formData) {
      this.businessLicenseCopyImageUploadForm.dataId = this.account.customerId
      this.$store.dispatch('uploadFile', { formData, uploadFileForm: this.businessLicenseCopyImageUploadForm }).then(file => {
        Message({
          message: '营业执照复印件图片上传成功！',
          type: 'success'
        })
      })
        .catch(message => {
          Message({
            message,
            type: 'error'
          })
        })
    },
    contractload (formData) {
      this.handleContractloadHttpRequestForm.dataId = this.account.customerId
      this.$store.dispatch('uploadFile', { formData, uploadFileForm: this.handleContractloadHttpRequestForm }).then(file => {
        Message({
          message: '合同原件图片上传成功！',
          type: 'success'
        })
      })
        .catch(message => {
          Message({
            message,
            type: 'error'
          })
        })
    },
    // 展示图片
    getImageUrls (type) {
      return this
        .account
        .fileList
        .filter(({ fileType }) => fileType === type)
        .map(({ fileUrl }) => `https://${fileUrl.replace('/data/wwwroot/', '')}`)
    },
    // 根据 ID 获取客户
    getCustomer () {
      this.$store.dispatch('getCustomerById', this.customerId).then(() => {
        this.updateCustomerForm.customerId = this.account.customerId
        this.updateCustomerForm.customerLevelValue = this.account.customerLevelValue
        this.updateCustomerForm.customerLevelName = this.account.customerLevelName
        this.updateCustomerForm.customerStatusName = this.account.customerStatusName
        this.updateCustomerForm.customerName = this.account.customerName
        this.updateCustomerForm.customerLinkerName = this.account.customerLinkerName
        this.updateCustomerForm.customerLinkerPhone = this.account.customerLinkerPhone
        this.updateCustomerForm.customerBusinessPhone = this.account.customerBusinessPhone
        this.updateCustomerForm.customerLevelName = this.account.customerLevelName
        this.updateCustomerForm.customerAddress = this.account.customerAddress
        this.updateCustomerForm.customerBusinessEmail = this.account.customerBusinessEmail
        this.updateCustomerForm.customerFromWay = this.account.customerFromWay
        // this.updateCustomerForm.customerFromDetail = this.account.customerFromDetail
        this.updateCustomerForm.customerRelUserId = this.account.customerRelUserId
        this.updateCustomerForm.customerRelUserName = this.account.customerRelUserName
        this.updateCustomerForm.remark = this.account.remark
        this.updateCustomerForm.creditCode = this.account.creditCode
        this.taskList = this.account.taskList
      })
    },
    handleAddTaskDialogOkButtonClick () {
      if (this.addTaskForm.productName === '代理记账') {
        this.addTaskForm.longTerm = '0'
      } else {
        this.addTaskForm.longTerm = '1'
      }
      this.createTask()
    },
    // 修改客户信息
    updateCustomer () {
      this.$store.dispatch('updateCustomer', this.updateCustomerForm).then(() => {
        Message({
          message: '修改客户成功',
          type: 'success'
        })
        this.$router.push({ path: '/account' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    },
    // 订单的修改
    updateTask () {
      const index = 0
      console.log(index)
      this.$store.dispatch('updateTask', this.updateTaskForm).then(() => {
        this.editTaskDialogVisible = false
        // 刷新流程列表
        const task = this.taskList[index]
        const longTerm = this.updateTaskForm.longTerm
        task.price = this.updateTaskForm.price
        task.relUserId = this.updateTaskForm.relUserId
        task.relUserName = this.updateTaskForm.relUserName
        if (longTerm === '0') {
          task.relHelpUserId = this.updateTaskForm.relHelpUserId ? this.updateTaskForm.relHelpUserId : ''
          task.relHelpUserName = this.updateTaskForm.relHelpUserName ? this.updateTaskForm.relHelpUserName : ''
          task.number = this.updateTaskForm.number
          task.payCycle = this.updateTaskForm.payCycle
        } else if (longTerm === '1') {

        } else if (longTerm === '2') {

        }
        console.log(task)
        Message({
          message: '修改成功',
          type: 'success'
        })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    },
    // 添加新订单
    createTask () {
      this.addTaskForm.customerId = this.customerId
      this.$store.dispatch('createTask', this.addTaskForm).then(() => {
        Message({
          message: '添加成功',
          type: 'success'
        })
        Object.keys(this.addTaskForm).forEach(key => {
          this.addTaskForm[key] = ''
        })
        this.taskList.push(Object.assign({}, this.addTaskForm))
        this.getCustomer()
        this.addTaskDialogVisible = false
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    },
    handleUpdateCustomerButtonClick () {
      this.updateCustomer()
    },
    handleAddNewProduct () {
      this.addProductDialogVisible = true
    },
    // 4.21
    handleEditTaskButtonClick (index) {
      const task = this.taskList[index]
      this.updateTaskForm.taskId = task.taskId
      this.updateTaskForm.productId = task.productId
      this.updateTaskForm.productName = task.productName
      this.updateTaskForm.relUserId = task.relUserId
      this.updateTaskForm.relUserName = task.relUserName
      this.updateTaskForm.longTerm = task.longTerm
      this.updateTaskForm.number = task.number
      this.updateTaskForm.price = task.price
      this.updateTaskForm.customerId = task.customerId
      this.updateTaskForm.relHelpUserId = task.relHelpUserId
      this.updateTaskForm.relHelpUserName = task.relHelpUserName
      this.updateTaskForm.payCycle = task.payCycle
      this.editTaskDialogVisible = true
      if (task.longTerm === '0') {
        this.isAngentDetail = false
      } else if (task.longTerm === '1') {
        this.isAngentDetail = true
      } else if (task.longTerm === '2') {

      }
    },
    handleupdateTaskFormFinancialAdviserSelectChange (id) {
      this.updateCustomerForm.updateTaskForm.relUserName = this.getUserName(id)
    },
    handleupdateTaskFormAccountingAssistantSelectChange (id) {
      this.updateCustomerForm.updateTaskForm.relHelpUserName = this.getUserName(id)
    },
    handleDeleteTaskButtonClick (index, row) {
      const taskIds = row.taskId
      if (!(row.taskStatusValue === '0' || row.taskStatusValue === '1')) {
        Message({
          message: '未开始或是服务中流程才可进行删除操作',
          type: 'error'
        })
      }
      this.$store.dispatch('deleteTask', taskIds).then(() => {
        this.taskList.splice(index, 1)
        Message({
          type: 'success',
          message: '删除订单成功'
        })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    },
    async addTask () {
      try {
        this.addTaskForm.customerId = this.customerId
        await this
          .$store
          .dispatch(
            'createTask',
            this.addTaskForm
          )
      } catch (message) {
        console.log(message)
      }
    },
    handleUpdateTaskFormFinancialAdviserSelectChange (id) {
      this.updateTaskForm.relUserName = this.getUserName(id)
    },
    handleAddTaskFormFinancialAdviserSelectChange (id) {
      this.addTaskForm.relUserName = this.getUserName(id)
    },
    handleAddTaskFormAccountingAssistantSelectChange (id) {
      this.addTaskForm.relHelpUserName = this.getUserName(id)
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
      this.addTaskForm.productName = this.getProductNameById(id)
    },
    getProducts () {
      // 这里还需要增加获取失败时的提示
      this.$store.dispatch('getAllProducts')
    },
    // 根据 ID 获取产品
    getProductById (id) {
      return this
        .products
        .filter(({ productId }) => productId === id)[0]
    },
    getProductNameById (id) {
      return this
        .getProductById(id)
        .productName
    },
    handleupdateTaskFormProductSelectChange (id) {
      // 根据产品 ID 获取产品名称并赋值给添加产品表单对应字段
      this.edit.productName = this.getProductNameById(id)
    },
    handleAddTaskButtonClick () {
      this.addTaskDialogVisible = true
    },
    getUsers () {
      this
        .$store
        .dispatch(
          'getUserList',
          this.getUsersForm
        )
    },
    getUser (id) {
      return this
        .users
        .filter(({ userId }) => userId === id)[0]
    },
    getUserName (id) {
      return this
        .getUser(id)
        .userName
    },
    isTasksContainAgentReport () {
      return this.taskList.filter(({ productName }) => productName === '代理记账').length > 0
    },
    getAllCustomers () {
      this.$store.dispatch('getAllCustomers')
    },
    getChannels () {
      this.$store.dispatch('getAllChannels')
    }
  },
  mounted () {
    this.customerId = this.$route.query.customerId
    this.getAllCustomers()
    this.getProducts()
    this.initFileList()
    this.getChannels()
    // 基本信息
    this.updateCustomerForm.customerId = this.account.customerId
    this.updateCustomerForm.customerStatusName = this.account.customerStatusName
    this.updateCustomerForm.customerName = this.account.customerName
    this.updateCustomerForm.customerLinkerName = this.account.customerLinkerName
    this.updateCustomerForm.customerLinkerPhone = this.account.customerLinkerPhone
    this.updateCustomerForm.customerBusinessPhone = this.account.customerBusinessPhone
    this.updateCustomerForm.customerLevelValue = this.account.customerLevelValue
    this.updateCustomerForm.customerLevelName = this.account.customerLevelName
    this.updateCustomerForm.customerAddress = this.account.customerAddress
    this.updateCustomerForm.customerBusinessEmail = this.account.customerBusinessEmail
    this.updateCustomerForm.customerFromWay = this.account.customerFromWay
    this.updateCustomerForm.customerFromDetail = this.account.customerFromDetail
    this.updateCustomerForm.customerRelUserId = this.account.customerRelUserId
    this.updateCustomerForm.customerRelUserName = this.account.customerRelUserName
    this.updateCustomerForm.remark = this.account.remark
    this.updateCustomerForm.creditCode = this.account.creditCode
    this.updateCustomerForm.royaltyCoefficient = this.account.royaltyCoefficient
    this.taskList = this.account.taskList
    // 订单列表里的修改

    this.initCustomerFromDetail(this.account.customerFromWay)
  },
  computed: {
    isAgentReport () {
      return this.account.taskList.filter(process => process.productName === '代理记账').length > 0
    },
    ...mapState({
      account: state => state.customer.customer,
      users: state => state.sysUser.users.list,
      allCustomers: state => state.customer.allCustomers.customerList,
      products: state => state.product.allProducts.list,
      channels: state => state.channel.allChannels.list
    }),
    isRoyaltyCoefficientShow () {
      return this.isTasksContainAgentReport()
    },
    // 累加
    getAddMoney () {
      var money = 0
      for (const item of this.taskList) {
        money += item.number ? item.price * item.number : item.price
      }
      return money
    }
  }
}
</script>

<style scoped>
.modify-view-account{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
  height: 150%;
}
.modify-view-account-title{
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
.add-products-model{
  padding-top: 25px;
}
</style>
