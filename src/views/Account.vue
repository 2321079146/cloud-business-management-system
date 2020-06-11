<template>
  <div class="customer">
    <div class="account-header-custom">
        <el-row :gutter="20" class="header-custom">
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="handleClickCreateAccount">新  建</el-button>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <el-button >导  出</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-select v-model="getCustomersForm.customerStatusName" @change="handleStatusChange">
                <el-option
                  v-for="(customerStatu, index) in customerStatus"
                  :key="index"
                  :label="customerStatu.name"
                  :value="customerStatu.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <div>
                <el-input placeholder="请输入内容" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>
          </el-col>
          <el-col :span="1"><el-button type="text"></el-button></el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-button class="new-seetings" style="float:right;" @click="handleAdvancedSearch">高级检索</el-button>
              <el-dialog title="高级检索" width="40%" :visible.sync="advancedSearchDialogVisible">
                <el-form label-position="top" label-width="120px">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="客户名称:">
                        <el-select style="width: 100%;" v-model="advancedSearchForm.customerName"></el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系人:">
                        <el-input></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="客户状态:">
                        <el-select style="width: 100%;" v-model="advancedSearchForm.customerStatus"></el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话:">
                        <el-input></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="销售代表:">
                        <el-input></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="客户等级:">
                        <el-select style="width: 100%;" v-model="advancedSearchForm.customerLevel" @change="handleCustomerLevelSelectChange">
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
                      <el-form-item label="社会信用代码:">
                        <el-input></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="创建日期:">
                        <el-date-picker style="width: 100%;"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button>重  置</el-button>
                  <el-button type="primary" @click="handleAdvancedSearchButtonClcik">开始检索</el-button>
                </div>
              </el-dialog>
            </div>
          </el-col>
        </el-row>
    </div>
    <div class="account-table-custom">
      <el-tabs type="border-card" v-model="getCustomersForm.data.type" @tab-click="handelTabClick">
        <el-tab-pane v-for="(tab, index) in accountLabels" :key="index" :label="tab.label" :name="tab.name">
          <el-table
            ref="multipleTable"
            :data="customers.list"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              fixed
              type="selection">
            </el-table-column>
            <el-table-column
              prop="customerName"
              :show-overflow-tooltip="true"
              label="客户名称">
            </el-table-column>
            <el-table-column
              prop="customerFromWay"
              label="客户来源">
            </el-table-column>
            <el-table-column
              prop="customerLinkerName"
              label="联系人">
            </el-table-column>
            <el-table-column
              prop="customerLinkerPhone"
              :show-overflow-tooltip="true"
              label="联系电话">
            </el-table-column>
            <el-table-column
              prop="customerStatusName"
              label="客户状态">
            </el-table-column>
            <el-table-column
              prop="customerLevelName"
              label="客户等级">
            </el-table-column>
            <el-table-column
              prop="customerRelUserName"
              label="客户代表">
            </el-table-column>
            <el-table-column
              prop="OrderTotal"
              label="订单总额">
                <template slot-scope="scope">
                  <p>{{ getTotalAmount(scope.row) }}</p>
                </template>
            </el-table-column>
            <el-table-column
              prop="operating"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="handleViewAccountClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div style="margin-top: 20px">
        <el-pagination
          background
          layout="total,prev, pager, next"
          @current-change="handleCurrentChangeClick"
          :current-page="getCustomersForm.page"
          :total="customers.totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getLabels } from '../api/label'
import { mapState } from 'vuex'

export default {
  metaInfo: {
    title: '客户列表'
  },
  data () {
    return {
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
      customerStatus: [
        {
          name: '服务中',
          value: '0'
        },
        {
          name: '已完成',
          value: '1'
        },
        {
          name: '全部',
          value: '3'
        }
      ],
      multipleSelection: [],
      advancedSearchDialogVisible: false,
      accountLabels: [],
      getCustomersForm: {
        params: {
          limit: 10,
          page: 1
        },
        data: {
          type: ''
        }
      },
      advancedSearchForm: {
        customerName: ''
      }
    }
  },
  methods: {
    // 根据订单状态更新列表
    handleStatusChange (statusValue) {
      if (statusValue === '3') {
        delete this.getCustomersForm.data.status
      } else {
        this.getCustomersForm.data.status = statusValue
      }
      this.getCustomers()
    },
    getCustomerLevelName (value) {
      if (value === '0') {
        return '普通'
      }
      return 'VIP'
    },
    handleCustomerLevelSelectChange (value) {
      this.advancedSearchForm.customerLevelName = this.getCustomerLevelName(value)
    },
    handleAdvancedSearchButtonClcik () {
      this.advancedSearchDialogVisible = false
    },
    getTotalAmount ({ taskList }) {
      if (taskList.length !== 0) {
        return taskList.map(task => task.price * task.number).reduce((x, y) => x + y)
      }
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleClickCreateAccount () {
      this.$router.push({ path: '/new-account-page' })
    },
    handleAdvancedSearch () {
      this.advancedSearchDialogVisible = true
    },
    handleViewAccountClick (row) {
      this.$router.push({ path: '/view-account', query: { customerId: row.customerId } })
    },
    getAccountLabels () {
      getLabels('customer').then(({ data: accountLabels }) => {
        this.accountLabels = accountLabels.map(accountLabel => {
          const name = Object.keys(accountLabel)[0]
          const label = accountLabel[name]
          return {
            label,
            name
          }
        })
        this.getCustomersForm.data.type = this.accountLabels[0].name
        this.getCustomers()
      })
    },
    // 用vuex 获取表单
    getCustomers () {
      this.$store.dispatch('getCustomers', this.getCustomersForm)
    },
    handelTabClick () {
      this.getCustomersForm.params.page = 1
      this.getCustomers()
    },
    handleCurrentChangeClick (currentPage) {
      this.getCustomersForm.params.page = currentPage
      this.getCustomers()
    }
  },
  mounted () {
    this.getAccountLabels()
  },
  computed: {
    ...mapState({
      customers: state => state.customer.customers
    })
  }
}
</script>

<style scope>
.account-custom{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.account-header-custom{
  width: 100%;
}
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
.el-main{
  line-height: 20px;
}
#u829_img{
  position: relative;
  top: 2px;
}
.el-col-3{
  width:7.5%;
}
.el-tabs--border-card>.el-tabs__content{
  padding: 0;
}
</style>
