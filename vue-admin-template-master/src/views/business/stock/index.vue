<template>
  <div class="app-container">
    <!-- 条件查询 -->
    <!-- //条件查询 todo -->
    <div>
      <!-- 搜索 -->
      <el-col :span="2"  :offset="6">
        <el-select v-model="query.sortStatus" clearable placeholder="排序">
          <el-option value="0" label="存量降序"></el-option>
          <el-option value="1" label="日期升序"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-select v-model="query.numStatus" clearable placeholder="存量">
          <el-option value="0" label="存量查询"></el-option>
          <el-option value="1" label="不限数量"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-input v-model="query.contractId" placeholder="合同编号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-input v-model="query.receiptId" placeholder="发票编号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-input v-model="query.goodsName" placeholder="品名"></el-input>
      </el-col>
      <el-col :span="2">
        <el-input v-model="query.productName" placeholder="商品名称"></el-input>
      </el-col>
      <el-col :span="2">
        <el-input v-model="query.productType" placeholder="型号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-input v-model="query.remark" placeholder="备注"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="querystockInfo()">查询</el-button>
      </el-col>
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
      @expand-change="getReceiptInfo">

      <el-table-column prop="contractId" label="合同编号" width="100"></el-table-column>
      <el-table-column prop="receiptId" label="发票编号" width="100"></el-table-column>
      <el-table-column prop="date" label="开票日期" width="100"></el-table-column>
      <el-table-column prop="tradeName" label="品名" width="70"></el-table-column>
      <el-table-column prop="productName" label="商品名称" width="100"></el-table-column>
      <el-table-column prop="productType" label="型号" width="70"></el-table-column>
      <el-table-column prop="useAmount" label="关联数量"></el-table-column>
      <el-table-column prop="purchaseNum-useAmount" label="剩余数量"></el-table-column>
      <el-table-column prop="purchaseNum" label="数量"></el-table-column>
      <el-table-column prop="totalPrice" label="金额" width="70"></el-table-column>
      <el-table-column label="发票类型" prop="receiptType">
        <template slot-scope="props">
          <div v-if="props.row.receiptType === 0">1%</div>
          <div v-if="props.row.receiptType === 1">6%</div>
          <div v-if="props.row.receiptType === 2">9%</div>
          <div v-if="props.row.receiptType === 3">13%</div>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>

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
import product from '@/api/account/product'
import Vue from 'vue'

export default {
  data() {
    return {
      list: [], //查询之后接口返回集合
      receiptList: [],
      // updateTimes:0,//合同更新次数
      page: 1,
      limit: 10,
      stockQuery: {}, //条件封装对象
      // contractQuery: {}, //条件封装对象
      // contract: {
      //   belong: '',
      //   region: '',
      //   contractId: '',
      //   date: '',
      //   buyingUnit: '',
      //   amount: '',
      //   note: '',
      //   updateTimes: 0
      // },
      // addRI: {
      //   createType: '1'
      // },
      // receipt: {
      //   contractId: '',//所属合同编号
      //   receiptId: '',//发票编号
      //   receiptDate: '',//开票日期
      //   receiptType: '',//发票类型1.1% 2.6% 3. 9% 4.13%
      //   totalPrice: '',//发票金额
      // },
      // product: {
      //   tradeName: '',
      //   productName: '',//商品名称
      //   goodsName: '',//品名
      //   productType: '',//型号
      //   correlationNum: '',//关联数量
      //   remainingNum: '',//剩余数量
      //   totalNum: '',//总数量
      //   purchaseNum: 0,
      //   unitPrice: 0,
      //   totalPrice: 0
      // },
      //按条件查询
      query:{
        goodsName:'',//品名
        productName:'',//商品名称
        productType:'',//型号
        contractId:'',//合同编号
        receiptId:'',//发票编号
        remark:'',//备注
        sortStatus:'',//排序
        numStatus:'',//存量
      },
      formLabelWidth: '80px',
    }
  },
  computed:{
  },
  methods: {
    //根据信息查询
    querystockInfo(){
      product.getStock(this.query).then(response =>{
        this.list = response.data.list
      })
    },

    getList(page = 1) {
      this.page = page
      product.getPageList(this.page, this.limit).then(resp => {
        this.list = resp.data.list
        // console.log("11111" + this.list);
      })
    },

    // //根据id查询contract信息
    // getContractInfo(id) {
    //   this.dialogContratVisible = true //打开弹窗
    //   contract.getContractById(id).then(response => {
    //     this.contract = response.data.contract
    //     // console.log(this.contract)
    //   })
    // },
  },
  created() {
    this.getList()
  }
}
</script>

<style>

</style>
