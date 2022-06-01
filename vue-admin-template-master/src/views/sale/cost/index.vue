<template>
  <div class="app-container">
    <!--    table组件-->
    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
      @expand-change="getProductInfo"
    >
      <!--展开行功能 todo-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" max-height="250" border
                    style="width: 100%"
          >
            <el-table-column label="品名" prop="tradeName" fixed></el-table-column>
            <el-table-column label="商品名称" prop="productName"></el-table-column>
            <el-table-column label="型号" prop="productType"></el-table-column>
            <el-table-column label="单价" prop="unitPrice"></el-table-column>
            <el-table-column label="关联数量" prop="count"></el-table-column>
            <el-table-column label="发票编号" prop="receiptId"></el-table-column>
            <el-table-column label="合同编号" prop="contractId"></el-table-column>
            <el-table-column label="操作者" prop="createBy"></el-table-column>
            <el-table-column label="操作日期" prop="createTime"></el-table-column>
            <el-table-column label="占用类型" prop="type">
              <template slot-scope="props">
                <div v-if="props.row.type === 0">成本占用</div>
                <div v-if="props.row.type === 1">补票占用</div>
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="status">
              <template slot-scope="props">
                <div v-if="props.row.status === 0">作废</div>
                <div v-if="props.row.status === 1">正常</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="removeReceipt(scope.row.receiptId)">作废</el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>


      <el-table-column prop="buyingUnit" label="采购单位" width="200">
      </el-table-column>
      <el-table-column prop="contractId" label="合同编号" width="200">
      </el-table-column>
      <el-table-column prop="receiptId" label="发票编号" width="200">
      </el-table-column>
      <el-table-column prop="receiptDate" label="开票日期" width="200"></el-table-column>
      <el-table-column prop="receiptType" label="发票类型" width="200">
        <template slot-scope="scope">
          <div v-if="scope.row.receiptType === 0">1%</div>
          <div v-if="scope.row.receiptType === 1">6%</div>
          <div v-if="scope.row.receiptType === 2">9%</div>
          <div v-if="scope.row.receiptType === 3">13%</div>
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="发票金额" width="200">
      </el-table-column>
      <el-table-column prop="rate" label="关联率"  width="200"></el-table-column>

      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="openDrawer(scope.row.receiptId)"
          >关联
          </el-button>
          <el-button
            type="success"
            size="mini"
          >完成
          </el-button>
          <el-drawer :visible.sync="dialogCorrelationVisible" title="修改" direction="rtl" size="50%" style="margin-left: 16px">
            <!--            标签页-->
            <template >
              <el-tabs @tab-click="handleClick">
                <el-tab-pane label="关联明细">
                  <el-table
                    :data="product"
                    style="width: 100%; margin-left: 16px; margin-right: 16px"
                    border
                    fit
                    highlight-current-row
                  >
                    <el-table-column label="品名" prop="tradeName" fixed></el-table-column>
                    <el-table-column label="商品名称" prop="productName" fixed></el-table-column>
                    <el-table-column label="型号" prop="productType" fixed></el-table-column>
                    <el-table-column label="剩余数量" prop="receiptId" fixed></el-table-column>
                    <el-table-column label="关联数量" prop="count" fixed></el-table-column>
                    <el-table-column label="单价" prop="unitPrice" fixed></el-table-column>
                    <el-table-column label="发票编号" prop="receiptId" fixed></el-table-column>
                    <el-table-column label="合同编号" prop="receiptId" fixed></el-table-column>
                    <el-table-column label="操作" fixed>

                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <!--                从采购中查询明细-->
                <el-tab-pane label="查询">
                  <div>
                    <el-row>

                      <el-col :span="2">
                        <el-button @click="queryPurchaseProduct()" icon="el-icon-search"type="primary" >查询</el-button>
                      </el-col>
                    </el-row>

                      <el-table
                        :data="purchaseProduct"
                        style="width: 100%;margin-left: 16px;margin-right: 16px"
                        border
                        fit
                        highlight-current-row
                      >
                        <el-table-column label="供应商" prop="receiptId" fixed></el-table-column>
                        <el-table-column label="品名" prop="tradeName" fixed></el-table-column>
                        <el-table-column label="商品名称" prop="productName" fixed></el-table-column>
                        <el-table-column label="型号" prop="productType" fixed></el-table-column>
                        <el-table-column label="单价" prop="unitPrice" fixed></el-table-column>
<!--                        <el-table-column label="剩余数量" prop="receiptId" fixed></el-table-column>-->
                        <el-table-column label="发票编号" prop="receiptId" fixed></el-table-column>
                        <el-table-column label="合同编号" prop="contractId" fixed></el-table-column>
<!--                        <el-table-column label="备注信息" prop="receiptId" fixed></el-table-column>-->
                        <el-table-column label="操作"  fixed >
                          <template slot-scope="props">
                            <el-button type="primary" @click="selectProduct(props.row.id)" >选择</el-button>
                          </template>

                        </el-table-column>
                      </el-table>
                  </div>
                </el-tab-pane>

<!--                <el-tab-pane label="发票明细">-->
<!--                  <el-table-->
<!--                    :data="receiptProduct"-->
<!--                    style="width: 100%"-->
<!--                    border-->
<!--                    fit-->
<!--                    highlight-current-row-->
<!--                  >-->
<!--                    <el-table-column label="品名" prop="receiptId" fixed></el-table-column>-->
<!--                    <el-table-column label="商品名称" prop="receiptId" fixed></el-table-column>-->
<!--                    <el-table-column label="型号" prop="receiptId" fixed></el-table-column>-->
<!--                    <el-table-column label="单价" prop="receiptId" fixed></el-table-column>-->
<!--                    <el-table-column label="数量" prop="receiptId" fixed></el-table-column>-->
<!--                    <el-table-column label="金额" prop="receiptId" fixed></el-table-column>-->

<!--                  </el-table>-->
<!--                </el-tab-pane>-->
              </el-tabs>
              <div class="footer" style="bottom: auto">
                <el-button @click="dialogCorrelationVisible = false">取消</el-button>
                <el-button @click="completeCorrelation(scope.row.id)" type="primary">保存</el-button>
              </div>
            </template>
          </el-drawer>
        </template>
      </el-table-column>
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
import cost from '@/api/sale/cost';
import receipt from '@/api/sale/receipt'
import product from '@/api/account/product'
export default {
  data() {
    return {
      list: [],
      total:0,
      page:1,
      limit:10,
      product:[],
      dialogCorrelationVisible: false,//关联弹窗dialog
      purchaseProduct:[],//查询得到的产品明细信息
      receiptProduct:[],//销售发票中的商品明细
      correlationDto:{
        receiptId:'',
        productId:'',
        count:'',
        type:'',
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    selectProduct(productId){
      this.correlationDto.productId = productId
      console.log(this.correlationDto.productId )
    },
    //查询采购合同中的明细
    queryPurchaseProduct(){
      product.getPageList().then(response=>{
        this.purchaseProduct = response.data.list
      })
    },
    openDrawer(receiptId){
      this.dialogCorrelationVisible = true
      cost.getReceiptRelationByReceiptId(receiptId).then(response => {
        this.product = response.data.list
      })
    },
    //完成关联
    completeCorrelation(receiptId){

      this.correlationDto.receiptId = receiptId
      console.log(receiptId)
      this.correlationDto.count = 1
      this.correlationDto.type = 0
      console.log(this.correlationDto)
      cost.createReceiptRelation(this.correlationDto).then(response=>{
        this.$message({
          message:'关联成功',
          type:'success'
        })
      })
      this.dialogCorrelationVisible = false
    },

    //获取发票下的所有商品明细
    getProductInfo(row,rowExpand) {
      // console.log(row)
      cost.getReceiptRelationByReceiptId(row.receiptId).then(response => {
        // console.log(response.data.list)
        //如果row.receiptId与list.receiptId相等，将关联发票数据加入children中
        this.list.forEach(item => {
          if (row.receiptId === item.receiptId) {
            this.$set(item, 'children', response.data.list)
          }
        })
      })
    },
    // 完成关联
    getCorrelation() {

    },
    //获取所有销售合同的发票信息，成本占用首页展示
    getList(){
      cost.getAllList().then(response=>{
        this.list = response.data.list
        // console.log(this.list)
      })
    }
  }

}
</script>

<style>

</style>
