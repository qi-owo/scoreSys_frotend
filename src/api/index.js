import http from './api';

const getTableData = () => http("post", `/api/api/search`)//查询获取信息
const login = (params) => http("post", `/api/api/login`, params)//登录
const searchAll = (params) => http("get", `/api/api/searchAll`, params)//登录
const deleteSc = (params) => http("post", `/api/api/deleteSc`, params)//删除成绩
const reviseSc = (params) => http("post", `/api/api/reviseSc`, params)//修改成绩
const addSc = (params) => http("post", `/api/api/addSc`, params)//插入
const revisePassword = (params) => http("post", `/api/api/revisePassword`, params) //修改密码


export default{
  getTableData,
  login,
  searchAll,
  deleteSc,
  reviseSc,
  addSc,
  revisePassword
}