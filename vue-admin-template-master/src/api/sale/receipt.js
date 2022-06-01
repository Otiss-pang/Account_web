import request from '@/utils/request'

export default {
  //修改发票
  updateReceipt(receipt) {
    return request({
      url: `/account/saleReceipt/updateReceipts`,
      method: 'post',
      data:receipt
    })
  },
  //添加发票
  addReceipt(receipt){
    return request({
      url: `/account/receipt/addReceipt`,
      // url: `/account/saleReceipt/addReceipt`,
      method: 'post',
      data:receipt
    })
  },
  //根据合同id查询所有发票信息
  getReceiptByContract(contractId){
    return request({
      url: `/account/saleReceipt/getReceiptById/${contractId}`,
      method: 'get',
    })
  },
  //根据发票id查寻发票信息
  getReceiptByReceiptId(receiptId){
    return request({
      url: `/account/saleReceipt/getInfoByReceiptId/${receiptId}`,
      method: 'get',
    })
  },
}
