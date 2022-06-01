import request from '@/utils/request'

export default {
  //分页查找合同
  getPageContract(current, limit) {
    return request({
      url: `/account/saleContract/pageSaleContract/${current}/${limit}`,
      method: 'get',
    })
  },
  //根据id查询合同信息
  getContractById(id) {
    return request({
      url: `/account/saleContract/getContractById/${id}`,
      method: 'get',
    })
  },
//修改合同
  updateContract(contract) {
    return request({
      url: `/account/saleContract/updateContract`,
      method: 'post',
      data:contract
    })
  },

  //增加合同
  addContract(contract) {
    return request({
      url: `/account/saleContract/addContract`,
      method: 'post',
      data:contract
    })
  },

  //条件查询查询合同
  queryContract(current,limit,contractQuery) {
    return request({
      url: `/account/saleContract/getConditionContract/${current}/${limit}`,
      method: 'post',
      data:contractQuery
    })
  },
  //添加发票
  addReceipt(receipt){
    return request({
      url: `/account/saleReceipt/addReceipt`,
      // url: `/account/saleReceipt/addReceipt`,
      method: 'post',
      data:receipt
    })
  },


}
