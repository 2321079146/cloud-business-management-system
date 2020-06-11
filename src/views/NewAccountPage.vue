<template>
  <div class="create-account">
    <p class="new-account-page-title">新建客户</p>
    <div class="dividing-line"></div>
    <el-collapse v-model="activeNames">
      <el-collapse-item
        title="基础信息"
        name="base-info">
        <el-form label-width="200px" label-position="right">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="客户名称：" required>
                <el-input v-model="createCustomerForm.customerName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人：" required>
                <el-input v-model="createCustomerForm.customerLinkerName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="社会信用代码：" required>
                <el-input v-model="createCustomerForm.creditCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：" required>
                <el-input v-model="createCustomerForm.customerLinkerPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="企业电话：">
                <el-input v-model="createCustomerForm.customerBusinessPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户等级：">
                <el-select v-model="createCustomerForm.customerLevelValue" style="width: 100%;" @change="handleCustomerLevelSelectChange">
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
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="联系地址：">
                <el-input v-model="createCustomerForm.customerAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业邮箱：">
                <el-input v-model="createCustomerForm.customerBusinessEmail"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="客户来源：" required>
                <el-select
                  style="width: 50%;"
                  v-model="createCustomerForm.customerFromWay"
                  @change="handleCreateCustomerFormCustomerSourceSelectChange">
                  <el-option
                    v-for="(customerSource, index) in customerSources"
                    :key="index"
                    :label="customerSource"
                    :value="customerSource">
                  </el-option>
                </el-select>
                <el-select
                  style="width: 50%;"
                  v-model="createCustomerForm.customerFromDetail">
                  <el-option
                    v-for="(customerSourceDetail, index) in customerSourceDetails"
                    :key="index"
                    :label="customerSourceDetail"
                    :value="customerSourceDetail">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户代表：" required>
                <el-select
                  v-model="createCustomerForm.customerRelUserId"
                  @change="handleCreateCustomerFormCustomerRepresentativeSelectChange" style="width: 100%;">
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
                <el-input v-model="createCustomerForm.royaltyCoefficient"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注：">
                <el-input v-model="createCustomerForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item
        title="订单列表"
        name="task-table">
          <div class="tasks-table">
            <el-table
              :data="createCustomerForm.taskList">
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column label="产品名称" prop="productName"></el-table-column>
              <el-table-column label="服务单价" prop="price"></el-table-column>
              <el-table-column label="服务周期" v-if="isRoyaltyCoefficientShow" prop="number"></el-table-column>
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
                            <el-input
                              v-model="editTaskForm.productName"
                              @change="handleAddTaskFormProductSelectChange"
                              disabled>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="财税顾问：" v-show="!isAngentDetail">
                            <el-select
                              v-model="editTaskForm.relUserId"
                              @change="handleEditTaskFormFinancialAdviserSelectChange">
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
                              v-model="editTaskForm.relUserId"
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
                              v-model="editTaskForm.price">
                            </el-input-number>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="会计助理" v-show="!isAngentDetail">
                            <el-select
                              v-model="editTaskForm.relHelpUserId"
                              @change="handleEditTaskFormAccountingAssistantSelectChange">
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
                              v-model="editTaskForm.number">
                            </el-input-number>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col>
                          <el-form-item label="付费方式：" v-show="!isAngentDetail">
                            <el-select
                              v-model="editTaskForm.payCycle">
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
                      <el-button type="primary" @click="editTaskDialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-button size="mini" type="text" @click="handleDeleteTaskButtonClick(scope.$index)">删除</el-button>
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
                    <el-form-item label="会计助理" v-show="!isAngentDetail">
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
                <el-button @click="addTaskDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddTaskDialogOkButtonClick">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        <el-row>
          <el-col>合计: {{getAddMoney}}</el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="文档资料: " name="doc-info">
        <el-form label-width="100px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="身份证复件: " required>
                <el-upload
                  action
                  :http-request="handleIdCardCopyUploadHttpRequest"
                  :on-preview="handlePreviewPicture"
                  :on-remove="handleRemovePicture"
                  :file-list="idCardCopyFiles"
                  list-type="picture">
                  <el-button size="small" type="primary">选择上传文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="营业执照复件: " required>
                <el-upload
                  action
                  :http-request="handleBusinessLicenseCopyImageUploadHttpRequest"
                  :on-preview="handlePreviewPicture"
                  :on-remove="handleRemovePicture"
                  list-type="picture">
                  <el-button size="small" type="primary">选择上传文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="合同原件：" required>
                <el-upload
                  action
                  :http-request="handleContractloadHttpRequest"
                  :on-preview="handlePreviewPicture"
                  :on-remove="handleRemovePicture"
                  :file-list="contract"
                  list-type="picture">
                  <el-button size="small" type="primary">选择上传文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
            <el-col :span="6"></el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse><br><br>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div>
      <el-button type="primary" :loading="isAccount" @click="handleCreateCustomerButtonClick">保 存</el-button>
      <el-button :loading="isAccount" @click="handleCancelCustomerButtonClick">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Message } from 'element-ui'
export default {
  metaInfo: {
    title: '新建客户'
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      activeNames: [
        'base-info',
        'task-table',
        'doc-info'
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
      customerSources: [
        '老客户',
        '渠道',
        '同事'
      ],
      customerSourceDetails: [],
      createCustomerForm: {
        customerName: '',
        customerLinkerName: '',
        creditCode: '',
        customerLinkerPhone: '',
        companyPhone: '',
        customerLevelValue: '',
        customerLevelName: '',
        customerRelUserId: '',
        customerRelUserName: '',
        customerFromWay: '',
        royaltyCoefficient: '',
        remark: '',
        customerAddress: '',
        customerBusinessEmail: '',
        taskList: [],
        fileList: []
      },
      addTaskDialogVisible: false,
      editTaskDialogVisible: false,
      // 获取产品列表的表单
      getProductsForm: {
        limit: 10,
        page: 1
      },
      paymentMethods: [
        '月付',
        '季付',
        '年付'
      ],
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
        // 赠送
        // 付费方式
        payCycle: '',
        longTerm: '0'
      },
      editTaskForm: {
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
      getUsersForm: {
        limit: 10,
        page: 1
      },
      getCustomersForm: {
        limit: 10,
        page: 1,
        type: 'business:customer:list:all'
      },
      getChannelsForm: {
        limit: 10,
        page: 1
      },
      idCardCopyUploadForm: {
        type: 'customer',
        dataId: 10,
        fileNameInfo: '身份证复印件图片',
        fileType: '身份证复印件图片'
      },
      idCardCopyFiles: [],
      business: [],
      contract: [],
      isAngentDetail: false,
      isAccount: false,
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
    // 获取产品列表
    getProducts () {
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
    handleEditTaskFormProductSelectChange (id) {
      // 根据产品 ID 获取产品名称并赋值给添加产品表单对应字段
      this.edit.productName = this.getProductNameById(id)
    },
    handleEditTaskButtonClick (index) {
      const task = this.createCustomerForm.taskList[index]
      this.editTaskForm = task
      this.editTaskDialogVisible = true
    },
    handleAddTaskButtonClick () {
      this.addTaskDialogVisible = true
    },
    getUsers () {
      this.$store.dispatch('getUserList', this.getUsersForm)
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
    handleCreateCustomerFormCustomerRepresentativeSelectChange (id) {
      this.createCustomerForm.customerRelUserName = this.getUserName(id)
    },
    handleAddTaskFormFinancialAdviserSelectChange (id) {
      this.addTaskForm.relUserName = this.getUserName(id)
    },
    handleAddTaskFormAccountingAssistantSelectChange (id) {
      this.addTaskForm.relHelpUserName = this.getUserName(id)
    },
    handleEditTaskFormFinancialAdviserSelectChange (id) {
      this.editTaskForm.relUserName = this.getUserName(id)
    },
    handleEditTaskFormAccountingAssistantSelectChange (id) {
      this.editTaskForm.relHelpUserName = this.getUserName(id)
    },
    handleCreateCustomerFormCustomerSourceSelectChange (customerSource) {
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
    handleAddTaskDialogOkButtonClick () {
      if (this.addTaskForm.productName === '代理记账') {
        this.addTaskForm.longTerm = '0'
      } else {
        this.addTaskForm.longTerm = '1'
      }
      this.createCustomerForm.taskList.push(Object.assign({}, this.addTaskForm))
      Object.keys(this.addTaskForm).forEach(key => {
        this.addTaskForm[key] = ''
      })
      this.addTaskDialogVisible = false
    },
    handleDeleteTaskButtonClick (index) {
      this.createCustomerForm.taskList.splice(index, 1)
    },
    async addTask () {
      try {
        await this
          .$store
          .dispatch(
            'createTask',
            this.addTaskForm
          )
      } catch (message) {
      }
    },
    getCustomers () {
      this.$store.dispatch('getCustomers', this.getCustomersForm)
    },
    getChannels () {
      this.$store.dispatch('getAllChannels')
    },
    getAllCustomers () {
      this.$store.dispatch('getAllCustomers', this.getChannelsForm)
    },
    isTasksContainAgentReport () {
      return this.createCustomerForm.taskList.filter(({ productName }) => productName === '代理记账').length > 0
    },
    getCustomerLevelName (value) {
      if (value === '0') {
        return '普通'
      }
      return 'VIP'
    },
    handleCustomerLevelSelectChange (value) {
      this.createCustomerForm.customerLevelName = this.getCustomerLevelName(value)
    },
    createCustomer () {
      this.isAccount = true
      this.$store.dispatch('createCustomer', this.createCustomerForm).then(() => {
        Message({
          message: '创建客户成功',
          type: 'success'
        })
        this.isAccount = false
        this.$router.push({ path: '/account' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
        this.isAccount = false
      })
    },
    handleCreateCustomerButtonClick () {
      this.createCustomer()
    },
    handleCancelCustomerButtonClick () {
      this.$router.push({ path: '/account' })
    },
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
      this.$store.dispatch('uploadFile', { formData, uploadFileForm: this.idCardCopyUploadForm }).then(file => {
        Message({
          message: '上传成功',
          type: 'success'
        })
        this.createCustomerForm.fileList.push(file)
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    },
    businessLicenseCopyImageUpload (formData) {
      this.$store.dispatch('uploadFile', { formData, uploadFileForm: this.businessLicenseCopyImageUploadForm }).then(file => {
        Message({
          message: '营业执照复印件图片上传成功！',
          type: 'success'
        })
        this
          .createCustomerForm
          .fileList
          .push(file)
      })
        .catch(message => {
          Message({
            message,
            type: 'error'
          })
        })
    },
    contractload (formData) {
      this.$store.dispatch('uploadFile', { formData, uploadFileForm: this.handleContractloadHttpRequestForm }).then(file => {
        Message({
          message: '合同原件图片上传成功！',
          type: 'success'
        })
        this
          .createCustomerForm
          .fileList
          .push(file)
      })
        .catch(message => {
          Message({
            message,
            type: 'error'
          })
        })
    }
  },
  mounted () {
    this.getProducts()
    this.getUsers()
    this.getChannels()
    this.getAllCustomers()
  },
  computed: {
    ...mapState({
      products: state => state.product.allProducts.list,
      users: state => state.sysUser.users.list,
      channels: state => state.channel.allChannels.list,
      allCustomers: state => state.customer.allCustomers.customerList
    }),
    isRoyaltyCoefficientShow () {
      return this.isTasksContainAgentReport()
    },
    // 累加
    getAddMoney () {
      const { taskList: tasks } = this.createCustomerForm
      return tasks.length === 0 ? 0 : tasks.map(({ price, number }) => price * number).reduce((x, y) => x + y)
    }
  }
}
</script>

<style>
.el-container{
  height: 100% !important;
}
.create-account{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.new-account-page-title{
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
.base-information-icon{
    margin-top: 13px;
    width: 17px;
    padding-right: 10px;
    float: left;
}
.account-source-left-custom{
  width: 49%;
  float: left;
}
.account-source-right-custom{
  width: 49%;
  float: right;
  margin-left: 0px !important;
}
.el-tag {
    background-color: #fff;
    border-color: #fff;
    display: inline-block;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
}
.el-table .cell{
    font-size: 17px;
}
.el-form-item__label{
  width: 160px !important;
}
.el-form-item__content{
  margin-left: 175px !important;
}
.IDnumber-upload{
  padding: 14px 160px !important;
  background-color: #fff !important;
  color: #111 !important;
  border: 1px solid #DCDFE6 !important;
  width: 375px !important;
}
.add-account-products{
  width: 100%;
  border: 1px dotted #DCDFE6;
  text-align: center;
}
.add-products-model{
  padding-top: 25px;
}
.add-product-item{
  margin-left: 0px !important;
}
.add-product-input{
  width: 90% !important;
}
</style>
