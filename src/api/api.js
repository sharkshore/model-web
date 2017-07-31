import axios from 'axios';

let base = '';
let remoteUrl='http://10.0.23.62:8081/db-manager'

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };


//添加SQL语句
export const addSqlModel = params => { return axios.post(`${remoteUrl}/dbmanager/addSqlModel.do`, params).then(res=>res.data)};

//查询SQL语句
export const querySqlModel=params=>{return axios.post(`${remoteUrl}/dbmanager/querySqlModel.do`, params).then(res=>res.data)};
