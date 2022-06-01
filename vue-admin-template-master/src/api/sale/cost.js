//成本占用
import request from '@/utils/request'

export default {
  //获取所有销售合同的发票信息，成本占用首页展示
  getAllList() {
    return request({
      url: `/account/costManage/getAllList`,
      method: 'get',
    })
  },
  // 根据销售发票ID查询关联
  getReceiptRelationByReceiptId(receiptId) {
    return request({
      url: `/account/correlation/${receiptId}`,
      method: 'get',
    })
  },

  //创建关联信息
  createReceiptRelation(correlationDto){
    return request({
      url: `/account/correlation/createRelation`,
      method: 'post',
      data:correlationDto
    })
  }
}
