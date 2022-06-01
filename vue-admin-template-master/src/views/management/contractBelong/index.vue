<template>

  <div class="app-container">
    <!-- 条件查询 -->
    <div>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-edit" @click="addBelongVisible = true">添加所属</el-button>
        </el-col>
        <!-- 搜索 -->
        <el-col :span="2" :offset="16">
          <el-input v-model="query.BelongName" placeholder="所属名称"></el-input>
        </el-col>
        <el-col :span="2">
          <el-select v-model="query.enabledStatus" clearable placeholder="状态">
            <el-option value="0" label="启用"></el-option>
            <el-option value="1" label="禁用"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="queryOwnershipInfo()">查询</el-button>
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

      <el-table-column prop="name" label="所属名称" width="100"></el-table-column>
      <el-table-column prop="contact" label="联系人"></el-table-column>
      <el-table-column prop="number" label="联系号码"></el-table-column>
      <el-table-column prop="state" label="状态" width="70">
        <template slot-scope="scope">
          <div v-if="scope.row.enabledStatus === 0">启用</div>
          <div v-if="scope.row.enabledStatus === 1">禁用</div>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间"></el-table-column>
      <el-table-column prop="creator" label="创建者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="getBelongInfo(scope.row.id)">修改
          </el-button>
          <el-dialog :visible.sync="dialogBelongVisible" title="修改">
            <el-form :model="belong" label-width="120px">
              <el-form-item label="所属名称">
                <el-input v-model="belong.belongName"/>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input v-model="belong.contacts"/>
              </el-form-item>
              <el-form-item label="联系号码">
                <el-input v-model="belong.contactNumber"/>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="belong.enabledStatus">
                  <el-option label="启用" :value="0"></el-option>
                  <el-option label="禁用" :value="1"></el-option>
                </el-select>
              </el-form-item>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogBelongVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateBelong">保 存</el-button>
            </div>
            </el-form>
          </el-dialog>

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

    <!--添加所属-->
    <el-dialog :visible.sync="addBelongVisible" title="添加所属">
      <el-form :model="belong" label-width="120px">

        <el-form-item label="所属名称">
          <el-input v-model="belong.belongName"/>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="belong.contacts"/>
        </el-form-item>
        <el-form-item label="联系号码">
          <el-input v-model="belong.contactNumber"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="belong.enabledStatus">
            <el-option label="启用" :value="0"></el-option>
            <el-option label="禁用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <!--        <el-form-item prop="belong.enabledStatus" label="状态">-->
<!--          <template slot-scope="scope">-->
<!--            <div v-if="scope.row.enabledStatus === 0">启用</div>-->
<!--            <div v-if="scope.row.enabledStatus === 1">禁用</div>-->
<!--          </template>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogContratVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBelong">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import contractOwnership from "@/api/account/contractOwnership";
import moment from "moment";
import contract from "@/api/sale/contract";

export default {
  data() {
    return {
      list: [], //查询之后接口返回集合
      receiptList: [],
      page: 1,
      limit: 10,
      belongQuery: {}, //条件封装对象
      //按条件查询
      query: {
        BelongName: '',
        enabledStatus: '',
      },
      addBelongVisible: false,//添加所属界面
      dialogBelongVisible: false,//修改所属界面
      belong: {
        belongName: '',
        contacts: '',
        contactNumber: '',
        enabledStatus: '',
      },
    }
  },
  methods: {
    //根据信息查询合同
    queryOwnershipInfo(page = 1) {
      this.page = page
      contractOwnership.queryOwnership(this.page, this.limit, this.query).then(response => {
        // this.total = response.data.total
        this.list = response.data.data
      })
    },
    //修改所属信息
    updateBelong() {
      // var moment = require('moment')
      // this.belong.date = moment(this.belong.date).format('YYYY-MM-DD')
      // this.belong.updateTimes = this.belong.updateTimes + 1
      contractOwnership.updateOwnership(this.belong).then(response => {
        this.$message({
          message: '修改信息成功',
          type: 'success'
        })
        this.dialogBelongVisible = false
        this.getList()
      })
    },
    //添加所属
    addBelong() {
      contractOwnership.addOwnership(this.belong).then((response) => {
        this.$message({
          message: '添加所属成功',
          type: 'success'
        })
      })
      this.addContratBelongVisible = false
    },
    getList(page = 1) {
      this.page = page
      contractOwnership.getPageList(this.page, this.limit).then(resp => {
        this.list = resp.data.rows
        console.log(this.list);
      })
    },
    //根据id查询信息
    getBelongInfo(id) {
      this.dialogBelongVisible = true //打开弹窗
      contractOwnership.getInfoById(id).then(response => {
        this.belong = response.data.belong
      })
    },
  },
  created() {
    this.getList()
  }

}
</script>

<style>

</style>
