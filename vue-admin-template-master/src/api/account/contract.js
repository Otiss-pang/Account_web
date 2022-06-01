import request from '@/utils/request'

export default {
  //分页查找合同
  getPageList(current, limit) {
    return request({
      url: `/account/contract/pageContract/${current}/${limit}`,
      method: 'get',
    })
  },
  //修改合同信息
  updateContract(contract) {
    return request({
      url: `/account/contract/updateContract`,
      method: 'post',
      data:contract
    })
  },
  //根据id查询合同信息
  getContractById(id) {
    return request({
      url: `/account/contract/${id}`,
      method: 'get',
    })
  },
  //新增合同信息
  addContract(contract) {
    return request({
      url: `/account/contract/addContract`,
      method: 'post',
      data:contract
    })
  },
  //条件查询查询合同
  queryContract(dd,limit,contractQuery) {
    // console.log(1111111111111111111111111111111111111111111111111)
    // console.log(current)
    // console.log(limit)
    let current = 1
    return request({
      // url: `/account/saleContract/getConditionContract/${current}/${limit}`,
      // url: `/account/contract/getConditionContract/${current}/${limit}`,
      url: `/account/contract/getConditionContract/1/10`,
      method: 'post',
      data:contractQuery
    })
  },



}
