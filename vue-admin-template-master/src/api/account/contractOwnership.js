import request from '@/utils/request'

export default {
  //分页查找
  getPageList(current, limit) {
    return request({
      url: `/account/contractOwnership/pageOwnership/${current}/${limit}`,
      method: 'get',
    })
  },
  //新增所属信息
  addOwnership(belong) {
    return request({
      url: `/account/contractOwnership/addOwnership`,
      method: 'post',
      data:belong
    })
  },
  //修改所属信息
  updateOwnership(belong) {
    return request({
      url: `/account/contractOwnership/updateOwnership`,
      method: 'post',
      data:belong
    })
  },
  //根据id查询信息
  getInfoById(id) {
    return request({
      url: `/account/contractOwnership/getInfoById/${id}`,
      method: 'get',
    })
  },
  //条件查询查询
  queryOwnership(current,limit,belongQuery) {
    return request({
      url: `/account/contractOwnership/getConditionOwnership/${current}/${limit}`,
      method: 'post',
      data:belongQuery
    })
  },



}
