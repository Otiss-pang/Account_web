<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <!-- //条件查询 todo -->
    <div>
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-button type="success" :disabled="true">{{totalAmount}}</el-button>
          </div>
        </el-col>

        <!-- 搜索 -->
        <el-col :span="2" offset="11">
          <el-input v-model="query.contractId" placeholder="合同编号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="query.buyingUnit" placeholder="采购单位名称"></el-input>
        </el-col>
        <el-col :span="2">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="query.date"
              type="date"
              placeholder="开票年月">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="2" offset="1">
          <el-button type="primary" icon="el-icon-search" @click="queryContractInfo()">查询</el-button>
        </el-col>
      </el-row>
    </div>


    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
      @expand-change="getReceiptInfo">
      <!--展开行功能 todo-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" max-height="250" border
                    style="width: 100%">
            <el-table-column label="品名" prop="tradeName"></el-table-column>
            <el-table-column label="商品名称" prop="productName"></el-table-column>
            <el-table-column label="型号" prop="productType"></el-table-column>
            <el-table-column label="采购数量" prop="purchaseNum"></el-table-column>
            <el-table-column label="单价" prop="unitPrice"></el-table-column>
            <el-table-column label="金额" prop="totalPrice"></el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column prop="receiptId" label="发票编号" width="100">
      </el-table-column>
      <el-table-column prop="buyingUnit" label="采购单位" width="100">
      </el-table-column>
      <el-table-column prop="amount" label="发票金额" width="100">
      </el-table-column>
      <el-table-column label="发票类型" prop="receiptType" width="100">
        <template slot-scope="props">
          <div v-if="props.row.receiptType === 0">1%</div>
          <div v-if="props.row.receiptType === 1">6%</div>
          <div v-if="props.row.receiptType === 2">9%</div>
          <div v-if="props.row.receiptType === 3">13%</div>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="开票日期"></el-table-column>
      <el-table-column prop="creator" label="创建者"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>

    </el-table>
    <!--分页组件-->
    <el-pagination
      background
      layout="prev, pager, next,total,jumper"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      :current-page="page"
      @current-change="getList"
    >
    </el-pagination>




  </div>
</template>

<script>
import contract from '@/api/sale/contract'
import receipt from '@/api/sale/receipt'
import moment from 'moment'
import Vue from 'vue'

export default {
  data() {
    return {
      list: [], //查询之后接口返回集合
      receiptList: [],
      // updateTimes:0,//合同更新次数
      page: 1,
      limit: 10,
      total: 0, //总记录数
      contractQuery: {}, //条件封装对象
      contract: {
        belong: '',
        region: '',
        contractId: '',
        date: '',
        buyingUnit: '',
        amount: '',
        note: '',
        updateTimes: 0
      },
      addRI: {
        createType: '1'
      },
      receipt: {
        contractId: '',//所属合同编号
        receiptId: '',//发票编号
        receiptDate: '',
        receiptType: '',//发票类型1.1% 2.6% 3. 9% 4.13%
        totalPrice: ''//发票金额
      },
      product: {
        tradeName: '',
        productName: '',
        productType: '',
        purchaseNum: 0,
        unitPrice: 0,
        totalPrice: 0
      },
      //按条件查询
      query:{
        date:'',
        productName:'',
        productType:'',
        contractId:'',
        buyingUnit:'',
        remark:'',
        receiptStatus:'',
      },
      formLabelWidth: '80px',
      dialogContratVisible: false,//修改合同界面
      dialogReceiptVisible: false,//添加发票页面
      addDialogContratVisible: false, //添加采购合同页面
      dialogUpdateReceiptVisible: false//修改发票页面
    }
  },
  computed:{
    //计算所有合同的总金额
    totalAmount(){
      var sum = 0
      for (var contract of this.list){
        sum += contract.amount
      }
      return "总金额：" + sum
    }
  },
  methods: {
    //根据信息查询合同
    queryContractInfo(page = 1){
      this.page = page
      contract.queryContract(this.page,this.limit,this.query).then(response =>{
        this.total = response.data.total
        this.list = response.data.data
      })
    },
    //根据发票id获得发票信息
    getRowReceipt(id){
      this.dialogUpdateReceiptVisible = true
      receipt.getReceiptByReceiptId(id).then(response =>{
        this.receipt = response.data.receipt
      })
    },
    //修改发票信息
    updateReceipt() {
      receipt.updateReceipt(this.receipt).then(response=>{
        this.$notify({
          message:'发票信息修改成功',
          type:'success'
        })
      })
      this.dialogUpdateReceiptVisible = false
    },
    //修改明细信息
    updateProduct() {
    },
    //根据合同id获得发票信息
    getReceiptInfo(row, expandRows) {
      receipt.getReceiptByContract(row.contractId).then(response => {
        //如果row.id与list.id相等，将得到的发票数据加入children中
        this.list.forEach(item => {
          if (row.id === item.id) {
            this.$set(item, 'children', response.data.list)
          }
        })
      })

    },
    //todo 实现添加发票和添加明细操作
    //添加销售合同
    addContract() {
      contract.addContract(this.contract).then((response) => {
        this.$message({
          message: '添加销售合同成功',
          type: 'success'
        })
      })
      this.addDialogContratVisible = false
    },
    //关闭添加发票弹窗
    cancelForm() {
      this.loading = false
      this.dialogReceiptVisible = false
    },
    //添加发票
    addReceipt(contrctId) {
      this.$confirm('确定要添加发票吗？').then(response => {
        this.receipt.contrctId = contrctId
        console.log(this.receipt)
        receipt.addReceipt(this.receipt).then(response => {
          this.$message({
            message: '添加发票成功',
            type: 'success'
          })
        })
        this.dialogReceiptVisible = false
      })

      // this.dialogReceiptVisible = false
    },
    getList(page = 1) {
      this.page = page
      contract.getPageContract(this.page, this.limit).then(resp => {
        this.list = resp.data.rows
        // console.log(this.list);
        this.total = resp.data.total
      })
    },
    //根据id查询contract信息
    getContractInfo(id) {
      this.dialogContratVisible = true //打开弹窗
      contract.getContractById(id).then(response => {
        this.contract = response.data.contract
        // console.log(this.contract)
      })
    },
    //修改合同信息
    updateContract() {
      var moment = require('moment')
      this.contract.date = moment(this.contract.date).format('YYYY-MM-DD')
      this.contract.updateTimes = this.contract.updateTimes + 1
      contract.updateContract(this.contract).then(response => {
        this.$message({
          message: '修改合同信息成功',
          type: 'success'
        })
        this.dialogContratVisible = false
        this.getList()
      })
    }

  },
  created() {
    this.getList()
  }
}
</script>

<style>

</style>
