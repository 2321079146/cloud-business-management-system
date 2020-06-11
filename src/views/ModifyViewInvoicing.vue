<template>
  <div class="modify-view-invoicing">
    <p class="modify-view-invoicing-title">申请开票</p>
    <div class="dividing-line"></div>
    <p><strong class="modify-view-invoicing-title-custom">基本信息</strong></p>
    <el-form label-width="150px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="发票类型：" required>
            <el-select v-model="updateInvoiceForm.invoiceTypeName" @change="handleTypeSelectChange" style="width:100%">
              <el-option value="0">增值税专用发票</el-option>
              <el-option value="1">增值税普通发票</el-option>
              <el-option value="2">增值税电子普通发票</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="服务公司: " required>
              <el-select class="account-source-left-custom" v-model="updateInvoiceForm.entityId" @change="handleComSelectChange" style="width: 100%" >
                <el-option
                  v-for="(company, index) in companies"
                  :key="index"
                  :label="company.fullName"
                  :value="company.tenantCompanyId">
                </el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="发票抬头：" required>
            <el-input v-model="updateInvoiceForm.invoiceHead"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="开票金额：" required>
            <el-input v-model="updateInvoiceForm.invoiceMoney"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="社会信用代码：" required>
            <el-input v-model="updateInvoiceForm.creditCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="电话：">
            <el-input v-model="updateInvoiceForm.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="地址：">
            <el-input v-model="updateInvoiceForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="开户银行：">
            <el-input v-model="updateInvoiceForm.bank"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="银行账号：">
            <el-input v-model="updateInvoiceForm.account"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="备注信息">
            <el-input v-model="updateInvoiceForm.invoiceRemark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" @click="handleUpdateInvoiceButtonClick">提交</el-button>
    <el-button @click="hanleCancel">取消</el-button><br><br><br>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { mapState } from 'vuex'
export default {
  metaInfo: {
    title: '修改开票'
  },
  data () {
    return {
      updateInvoiceForm: {
        invoiceId: 1,
        invoiceTypeName: '',
        entityId: '',
        entityName: '',
        invoiceHead: '',
        invoiceMoney: '',
        invoiceRemark: '',
        account: '',
        phone: '',
        address: '',
        bank: '',
        creditCode: 1895648799
      },
      invoiceId: 1,
      getServiceCompanyFrom: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    hanleCancel () {
      this.$router.push({ path: '/billing-list' })
    },
    getInvoice () {
      this.$store.dispatch('getBillingById', this.invoiceId).then(() => {
        this.updateInvoiceForm.invoiceId = this.invoiceId
        this.updateInvoiceForm.invoiceTypeName = this.invoice.invoiceTypeName
        this.updateInvoiceForm.entityId = this.invoice.entityId
        this.updateInvoiceForm.entityName = this.invoice.entityName
        this.updateInvoiceForm.invoiceHead = this.invoice.invoiceHead
        this.updateInvoiceForm.creditCode = this.invoice.creditCode
        this.updateInvoiceForm.phone = this.invoice.phone
        this.updateInvoiceForm.address = this.invoice.address
        this.updateInvoiceForm.bank = this.invoice.bank
        this.updateInvoiceForm.invoiceRemark = this.invoice.invoiceRemark
        this.updateInvoiceForm.account = this.invoice.account
        this.updateInvoiceForm.invoiceMoney = this.invoice.invoiceMoney
      })
    },
    handleUpdateInvoiceButtonClick () {
      this.modifyInvoice()
    },
    getTypeName (value) {
      if (value === '0') {
        return '增值税专用发票'
      } else if (value === '1') {
        return '增值税普通发票'
      } else if (value === '2') {
        return '增值税电子普通发票'
      }
    },
    handleTypeSelectChange (value) {
      this.updateInvoiceForm.invoiceTypeName = this.getTypeName(value)
    },
    // 所有服务公司获取
    getCompanies () {
      this.$store.dispatch('getCompanyList', this.getServiceCompanyFrom)
    },
    getCompanicesName (id) {
      return this.companies.filter(({ tenantCompanyId }) => tenantCompanyId === id)[0].fullName
    },
    handleComSelectChange (id) {
      console.log(id)
      this.updateInvoiceForm.entityName = this.getCompanicesName(id)
      console.log(this.updateInvoiceForm.entityId)
    },
    modifyInvoice () {
      this.$store.dispatch('updateInvoice', this.updateInvoiceForm).then(() => {
        Message({
          message: '修改成功',
          type: 'success'
        })
        this.$router.push({ path: '/billing-list' })
      }).catch(message => {
        Message({
          message,
          type: 'error'
        })
      })
    }
  },
  mounted () {
    this.getCompanies()
    this.invoiceId = this.$route.query.invoiceId
    this.getInvoice()
  },
  computed: {
    ...mapState({
      invoice: state => state.invoice.invoice,
      // 服务公司获取
      companies: state => state.tenantCompany.serviceCompanys.page.list
    })
  }
}
</script>
<style scoped>
.modify-view-invoicing{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.modify-view-invoicing-title{
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
.modify-view-invoicing-title-custom{
  line-height: 50px;
}
</style>
