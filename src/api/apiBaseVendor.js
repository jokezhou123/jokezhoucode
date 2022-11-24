import httpClient from '../utils/httpClient';

export default {

  //分页查询
  listByPage: (data,callback) => {
    return httpClient('/baseVendor/listByPage', {method:'post',data,}, callback);
  },

  //添加
  insert: (data,callback) => {
    return httpClient('/baseVendor/insert', {method:'post',data,}, callback);
  },

  //修改
  update: (data,callback) => {
    return httpClient('/baseVendor/update', {method:'post',data,}, callback);
  },

  //删除
  delete: (data,callback) => {
    return httpClient('/baseVendor/delete', {method:'post',params:data,}, callback);
  },
}
