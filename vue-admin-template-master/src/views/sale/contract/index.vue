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
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" @click="addDialogContratVisible = true">添加合同</el-button>
        </el-col>

        <!-- 搜索 -->
        <el-col :span="2">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="query.date"
              type="date"
              placeholder="合同年月"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="2" :offset="2">
          <el-input v-model="query.productName" placeholder="商品名称"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="query.productType" placeholder="型号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="query.contractId" placeholder="合同编号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="query.buyingUnit" placeholder="采购单位名称"></el-input>
        </el-col>
        <el-col :span="2">
          <el-input v-model="query.remark" placeholder="备注"></el-input>
        </el-col>
        <!--        todo 按照发票状态查询 -->
        <el-col :span="2">
          <el-select v-model="query.receiptStatus" clearable placeholder="发票状态">
            <el-option value="0" label="已开票"></el-option>
            <el-option value="1" label="部分开票"></el-option>
            <el-option value="2" label="未开票"></el-option>
          </el-select>
        </el-col>

<!--        <el-col :span="2">-->
<!--          <template>-->
<!--            <el-select v-model="product.optionsRowStatevalue" clearable placeholder="发票状态">-->
<!--              <el-option-->
<!--                v-for="item in optionsRowState"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value"-->
<!--              >-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </template>-->
<!--        </el-col>-->
        <el-col :span="2">
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
      @expand-change="getReceiptInfo"
    >
      <!--展开行功能 todo-->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" max-height="250" border
                    style="width: 100%"
          >
            <el-table-column label="发票编号" prop="receiptId" fixed></el-table-column>
            <el-table-column label="开票日期" prop="receiptDate"></el-table-column>
            <el-table-column label="发票金额" prop="totalPrice"></el-table-column>
            <el-table-column label="附件" prop="appendix"></el-table-column>
            <el-table-column label="更新次数" prop="updateTimes"></el-table-column>
            <el-table-column label="品名" prop="tradeName"></el-table-column>
            <el-table-column label="商品名称" prop="productName"></el-table-column>
            <el-table-column label="型号" prop="productType"></el-table-column>
            <el-table-column label="采购数量" prop="purchaseNum"></el-table-column>
            <el-table-column label="单价" prop="unitPrice"></el-table-column>
            <el-table-column label="金额" prop="totalPrice"></el-table-column>
            <el-table-column label="使用量" prop="useAmount"></el-table-column>
            <el-table-column label="更新次数" prop="updateTimes"></el-table-column>
            <el-table-column label="发票类型" prop="receiptType">
              <template slot-scope="props">
                <div v-if="props.row.receiptType === 0">1%</div>
                <div v-if="props.row.receiptType === 1">6%</div>
                <div v-if="props.row.receiptType === 2">9%</div>
                <div v-if="props.row.receiptType === 3">13%</div>
              </template>
            </el-table-column>
            <el-table-column label="创建者" prop="creator"></el-table-column>
            <el-table-column label="创建日期" prop="createDate"></el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="getRowReceipt(scope.row.receiptId)">修改发票</el-button>
                <el-dialog :visible.sync="dialogUpdateReceiptVisible" title="修改发票" append-to-body>
                  <el-form :model="receipt" label-width="120px">
                    <el-form-item label="发票编号">
                      <el-input v-model="receipt.receiptId"/>
                    </el-form-item>
                    <el-form-item label="开票日期">
                      <el-date-picker
                        v-model="receipt.receiptDate"
                        type="date"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                      <el-form-item label="发票类型">
                        <el-select v-model="receipt.receiptType">
                          <el-option label="1%" :value="0"></el-option>
                          <el-option label="6%" :value="1"></el-option>
                          <el-option label="9%" :value="2"></el-option>
                          <el-option label="13%" :value="3"></el-option>
                        </el-select>
                      </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogUpdateReceiptVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateReceipt">确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="primary" size="mini" @click="updateProduct">修改明细</el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>
      </el-table-column>


      <el-table-column prop="belong" label="合同所属" width="100">
      </el-table-column>
      <el-table-column prop="contractId" label="合同编号" width="100">
      </el-table-column>
      <el-table-column prop="date" label="合同日期"></el-table-column>
      <el-table-column prop="buyingUnit" label="采购单位" width="100">
      </el-table-column>
      <el-table-column prop="amount" label="合同金额" width="100">
      </el-table-column>
      <el-table-column prop="correlation" label="关联率"></el-table-column>

      <el-table-column prop="receiptStatus" label="发票状态" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.receiptStatus === 0">未开票</div>
          <div v-if="scope.row.receiptStatus === 1">部分开票</div>
          <div v-if="scope.row.receiptStatus === 2">已开票</div>
        </template>
      </el-table-column>
      <el-table-column prop="appendix" label="附件"></el-table-column>
      <el-table-column prop="updateTimes" label="更新次数" width="100">
      </el-table-column>
      <el-table-column prop="creator" label="创建者"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="note" label="备注信息"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="getContractInfo(scope.row.id)"
          >修改
          </el-button
          >
          <el-dialog :visible.sync="dialogContratVisible" title="修改">
            <el-form :model="contract" label-width="120px">
              <!-- <el-form-item label="合同类型">
                <el-select v-model="contract.belong">
                  <el-option label="过单" :value="0"></el-option>
                  <el-option label="进货" :value="1"></el-option>
                  <el-option label="进票" :value="2"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="合同所属">
                <el-input v-model="contract.belong"/>
              </el-form-item>
              <el-form-item label="区域标识">
                <el-input v-model="contract.region"/>
              </el-form-item>
              <el-form-item label="合同编号">
                <el-input v-model="contract.contractId"/>
              </el-form-item>
              <el-form-item label="合同日期">
                <el-date-picker
                  v-model="contract.date"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="采购单位">
                <el-input v-model="contract.buyingUnit"/>
              </el-form-item>
              <el-form-item label="合同金额">
                <el-input v-model="contract.amount"/>
              </el-form-item>
              <el-form-item label="备注信息">
                <el-input v-model="contract.note"/>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogContratVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateContract">确 定</el-button>
            </div>
          </el-dialog>
          <el-button type="primary" size="mini" label-position="right" label-width="300px"
                     @click="dialogReceiptVisible = true"
          >添加发票
          </el-button>
          <!--添加发票-->
          <el-drawer
            title="添加发票"
            :visible.sync="dialogReceiptVisible"
            direction="rtl"
            size="800px"
          >
            <el-form :model="contract" label-width="120px">
              <el-form-item label="创建方式">
                <el-radio-group v-model="addRI.createType">
                  <el-radio label="1">正式发票</el-radio>
                  <el-radio label="2">合同明细</el-radio>
                </el-radio-group>
              </el-form-item>
              <!--正式发票-->
              <template v-if="addRI.createType==1">
                <el-form-item label="发票编号">
                  <el-input v-model="receipt.receiptId"/>
                </el-form-item>
                <el-form-item label="开票日期">
                  <el-date-picker
                    v-model="receipt.receiptDate"
                    type="date"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="发票类型">
                  <el-select v-model="receipt.receiptType">
                    <el-option label="1%" :value="0"></el-option>
                    <el-option label="6%" :value="1"></el-option>
                    <el-option label="9%" :value="2"></el-option>
                    <el-option label="13%" :value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="发票金额">
                  <el-input v-model="receipt.amount"/>
                </el-form-item>
              </template>
              <!--合同明细-->
              <template v-if="addRI.createType==2">
                <el-form-item label="发票金额">
                  <el-input v-model="receipt.amount"/>
                </el-form-item>
              </template>
              <el-button @click="dialogReceiptVisible = false">取 消</el-button>
              <el-button type="primary" @click="addReceipt(scope.row.contractId)">确 定</el-button>
            </el-form>
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

    <!--添加合同-->
    <el-dialog :visible.sync="addDialogContratVisible" title="添加销售合同">
      <el-form :model="contract" label-width="120px">

        <el-form-item label="合同所属">
          <el-input v-model="contract.belong"/>
        </el-form-item>
        <el-form-item label="区域标识">
          <el-input v-model="contract.region"/>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="contract.contractId"/>
        </el-form-item>
        <el-form-item label="合同日期">
          <el-date-picker
            format="yyyy-MM-dd"
            v-model="contract.date"
            type="date"
            placeholder="请选择合同日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="采购单位">
          <el-input v-model="contract.buyingUnit"/>
        </el-form-item>
        <el-form-item label="合同金额">
          <el-input v-model="contract.amount"/>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="contract.note"/>
        </el-form-item>
        <el-form-item label="附件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :inline="true"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogContratVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContract">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import contract from '@/api/sale/contract'
import receipt from '@/api/sale/receipt'
import salecontract from "@/api/sale/contract";
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
        console.log(11111)
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
    //回显合同信息
    addReceiptInfo(id) {
      // this.dialogReceiptVisible = true //打开弹窗
      // console.log(id);
      contract.getContractById(id).then((response) => {
        this.contract = response.data.contract
        console.log(this.contract.type)
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
        this.receipt.contractId = contrctId
        // console.log(this.receipt)
        salecontract.addReceipt(this.receipt).then(response => {
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
