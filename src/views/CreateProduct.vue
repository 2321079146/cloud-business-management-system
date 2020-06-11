<template>
  <div class="create-product">
    <div class="create-product-title">新增产品
    <div class="dividing-line"></div>
    <div class="create-product-main">
      <el-form label-width="120px">
        <el-row>
          <el-col :span="7">
             <el-form-item label="产品板块: ">
              <div class="block">
                <el-cascader
                  v-model="productMoudleName"
                  @change="handleProductModuleChange"
                  :options="options">
                </el-cascader>
              </div>
             </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="产品名称: ">
              <el-input placeholder="请输入" v-model="createProductForm.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="指导价格（元）: ">
              <el-col :span="11">
                <el-form-item>
                  <el-input v-model="productMinPrice"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center;">至</el-col>
              <el-col :span="11">
                <el-form-item prop="">
                  <el-input v-model="productMaxPrice"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="产品单位: ">
              <el-select placeholder="次" style="width: 193px;" v-model="createProductForm.productUnitType">
                <el-option label="次" value="0"></el-option>
                <el-option label="年" value="1"></el-option>
                <el-option label="月" value="2"></el-option>
                <el-option label="人 / 天" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="概述: ">
              <el-input v-model="createProductForm.productSummy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-card>
            <div slot="header" class="clearfix">
              <span>产品描述：</span>
            </div>
            <froala id="edit" :tag="'textarea'" v-model="createProductForm.productDesc"></froala>
          </el-card>
        </el-row>
        <el-button>取 消</el-button>
        <el-button type="primary" :loading="isCreating" @click="handleCreateProductButtonClick">确 定</el-button>
      </el-form>
    </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  metaInfo: {
    title: '新建产品'
  },
  data () {
    return {
      productMinPrice: '',
      productMaxPrice: '',
      productMoudleName: '',
      value: [],
      options: [{
        value: '工商服务',
        label: '工商服务',
        children: [{
          value: '注册',
          label: '注册'
        }, {
          value: '变更',
          label: '变更'
        }, {
          value: '注销',
          label: '注销'
        }, {
          value: '其他',
          label: '其他'
        }]
      }, {
        value: '财税服务',
        label: '财税服务',
        children: [{
          value: '代理记账',
          label: '代理记账'
        }, {
          value: '财务服务',
          label: '财务服务'
        }, {
          value: '税务服务',
          label: '税务服务'
        }, {
          value: '发票相关服务',
          label: '发票相关服务'
        }, {
          value: 'qita',
          label: '其他'
        }]
      }, {
        value: '银行服务',
        label: '银行服务',
        children: [{
          value: '银行服务',
          label: '银行服务'
        }, {
          value: '其他',
          label: '其他'
        }]
      }, {
        value: '人事服务',
        label: '人事服务',
        children: [{
          value: '社保公积金',
          label: '社保公积金'
        }, {
          value: '居住证户口',
          label: '居住证户口'
        }, {
          value: '劳务招聘',
          label: '劳务招聘'
        }, {
          value: '其他',
          label: '其他'
        }]
      }, {
        value: '知识产权',
        label: '知识产权',
        children: [{
          value: '商标',
          label: '商标'
        }, {
          value: '著作权',
          label: '著作权'
        }, {
          value: '专利',
          label: '专利'
        }, {
          value: '管理体系认证',
          label: '管理体系认证'
        }, {
          value: '其他',
          label: '其他'
        }]
      }, {
        value: '法律服务',
        label: '法律服务',
        children: [{
          value: '法律服务',
          label: '法律服务'
        }, {
          value: '其他',
          label: '其他'
        }]
      }, {
        value: '其他服务',
        label: '其他服务',
        children: [{
          value: '加急',
          label: '加急'
        }, {
          value: '刻章',
          label: '刻章'
        }, {
          value: '遗失补办',
          label: '遗失补办'
        }, {
          value: '异常处理',
          label: '异常处理'
        }, {
          value: '其他',
          label: '其他'
        }]
      }, {
        value: '行业资质许可证',
        label: '行业资质许可证',
        children: [{
          value: '电商类资质',
          label: '电商类资质'
        }, {
          value: '建筑类资质',
          label: '建筑类资质'
        }, {
          value: '人力资源来资质',
          label: '人力资源来资质'
        }, {
          value: '食品餐饮类资质',
          label: '食品餐饮类资质'
        }, {
          value: '网络游戏类资质',
          label: '网络游戏类资质'
        }, {
          value: '文化出版运营资质',
          label: '文化出版运营资质'
        }, {
          value: '医疗类资质',
          label: '医疗类资质'
        }, {
          value: '其他',
          label: '其他'
        }]
      }, {
        value: '培训',
        label: '培训',
        children: [{
          value: '职业技能培训',
          label: '职业技能培训'
        }, {
          value: '业务培训',
          label: '业务培训'
        }, {
          value: '其他',
          label: '其他'
        }]
      }],
      createProductForm: {
        isLongTerm: '1',
        isUp: '0',
        productDesc: '',
        productMoudleId: 0,
        productMoudleName: '',
        productName: '',
        productPrice: '',
        productSummy: '',
        productUnitType: ''
      },
      isCreating: false
    }
  },
  methods: {
    handleCreateProductButtonClick () {
      this.createProductForm.productPrice = `${this.productMinPrice}-${this.productMaxPrice}`
      this.createProduct()
    },
    handleProductModuleChange (productModule) {
      this.createProductForm.productMoudleName = `${productModule[0]} / ${productModule[1]}`
      if (productModule[1] === '代理记账') {
        this.createProductForm.isLongTerm = '0'
      }
    },
    createProduct () {
      this.isCreating = true
      this.$store.dispatch('createProduct', this.createProductForm).then(() => {
        Message({
          message: '保存成功',
          type: 'success'
        })
        this.isCreating = false
        this.$router.push({ path: '/service-product' })
      }).catch(message => {
        Message({
          message: message,
          type: 'error'
        })
        this.isCreating = false
      })
    }
  }
}
</script>

<style>
.create-product{
  width: 94%;
  margin: 0 auto;
  margin-top: 40px;
}
.create-product-title{
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
.create-product-main{
  margin-top: 25px;
}

.fr-wrapper > div:nth-child(1) {
  display: none;
}
</style>
