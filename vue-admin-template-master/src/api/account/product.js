import request from '@/utils/request'

export default {
  //分页查找合同
  getPageList(current, limit) {
    return request({
      url: `/account/purchaseProduct/getAllPurchaseProduct`,
      method: 'get',
    })
  },
  //查询商品库存
  getStock(stockQuery) {
    return request({
      url: `/account/purchaseProduct/getStock`,
      method: 'post',
      data: stockQuery
    })
  },

}
