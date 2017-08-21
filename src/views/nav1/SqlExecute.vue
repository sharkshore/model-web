<template lang="html">
	<div class="">

<el-form :model="searchForm" :rules="rules" ref="searchForm" label-width="100px" >

  <el-form-item label="商户名称" prop="memberName">
    <el-select v-model="searchForm.memberName" placeholder="请选择商户" @change="changeMember">
       <el-option v-for="item in memberNames" :key="item" :label="item" :value="item">
    </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="分类名称" prop="execType">
    <el-select v-model="searchForm.execType" placeholder="请选择分类" @change="changeType">
       <el-option v-for="item in sqlModels " :key="item.ID" :label="item.EXEC_TYPE" :value="item.EXEC_TYPE">
    </el-option>
    </el-select>
  </el-form-item>


  <el-form-item label="sql语句" prop="originSql">
    <el-input type="textarea" v-model="originSql" :rows="rows" disabled></el-input>
  </el-form-item>

  <el-tag type="gray">以下是参数列表</el-tag>

  <div v-for="(p,index) in searchForm.parameters" :key="index">
	  <el-form-item :label="p"  prop="sqlParamValues">
	    <el-input v-model="searchForm.sqlParamValues[index]" style="width:215px;display: inline-block"></el-input>
	  </el-form-item>
  </div>


  <el-form-item label="执行人" prop="execUser">
    <el-input v-model="searchForm.execUser" style="width:215px"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('searchForm')">执行SQL</el-button>
    <el-button @click="resetForm('searchForm')">重置</el-button>
  </el-form-item>
</el-form>

<p>
	显示执行SQL的结果数据
</p>


 <el-table :data="tableData" stripe >
    <el-table-column  v-for="(column,index) in computeColumnNames" :label="column" >
         <template scope="scope">
            {{scope.row[column]}}
          </template>
     </el-table-column>
  </el-table>


</div>

</template>

<script>

import { queryMemberName ,querySqlModel ,executeSql ,getProcessResult } from '../../api/api';
import {cycle ,delay} from '../../common/js/config'

export default {
	data(){
		return {
		    memberNames:[],//商户所有名字,下拉列表
            sqlModels:[],//商户所有名字,下拉列表
            originSql:'',//原生SQL
            rows:11,
			searchForm:{
				memberName:'',
                execType:'',
				parameters:[],//参数名
				sqlParamValues:[],//参数值
                execUser:''
			},
			rules:{
				memberName: [{
						required: true,
						message: '商户名称不能为空',
						trigger: 'blur'
					}
				],
				sqlParamValues:[
		            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				]
			},
            tableData: [],//中间表结果数据
		}
	},
	methods:{
	    //计算参数
        computeParameters:function () {
            let sqlParameters={}
            let parameters=this.searchForm.parameters
            if(parameters.length>0){
                parameters.forEach((pname,index)=>{
                    sqlParameters[pname]=this.searchForm.sqlParamValues[index]
                })
            }
            return sqlParameters;
        },
	    //点击执行SQL按钮
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
				    let sqlParameters= this.computeParameters()
					//调用执行SQL的接口
                    let param={
                        execSql:this.originSql,
                        execUser:this.searchForm.execUser,
                        sqlParameters,//sql的参数
                    }
                    console.log(param);

				    //执行SQL
                    executeSql(param).then(res => {
                        if (res.success) {
                            console.log(res.data);
                        } else {
                            this.$message.error(res.errorMsg)
                        }
                    }).catch(err => {
                        console.log(err)
                    });

				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},

        //重置表单按钮
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},

        //获取所有商户名称
        getMemberNames() {
            queryMemberName({}).then(res => {
                if (res.success) {
                    this.memberNames=res.data
                } else {
                    this.$message.error(res.errorMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        //获取中间表结果
        getMiddleResult() {
                console.log('调用接口查询中间结果.....');
                getProcessResult({tableName:'XY_DW_TEMP'}).then(res => {
                    if (res.success) {
                        this.tableData=res.data;
                    } else {
                        this.$message.error(res.errorMsg)
                    }
                }).catch(err => {
                    console.log(err)
                })
        },

        //更换商户名称
        changeMember(memberName){
            //调用接口
            querySqlModel({memberName}).then(res => {
                if (res.success) {
                    this.sqlModels = res.data
                    if(Array.isArray(res.data) && res.data[0].EXEC_TYPE){
                        this. searchForm.execType=res.data[0].EXEC_TYPE
                        this.changeType(res.data[0].EXEC_TYPE)
                    }
                } else {
                    this.$message.error(res.errorMsg)
                }
            }).catch(err => {
                console.log(err)
            })
        },

        //更换类型
        changeType(type){
            console.log(type);
            let newsqlmodel= this.sqlModels.filter(s=>s.EXEC_TYPE == type)
            let params
            if(newsqlmodel.length> 0 && newsqlmodel[0].PARAMETERS){
                params=newsqlmodel[0].PARAMETERS.split(',')
                this.originSql=newsqlmodel[0].EXEC_SQL
            }
            this.searchForm.parameters=params
        }
	},
    computed:{
	    //计算列字段名
	    computeColumnNames(){
	        if(this.tableData.length>0)
	        return Object.keys(this.tableData[0])
            else return []
        }
    },

    //组件开始渲染
    beforeMount(){
	    this.interval=setInterval(this.getMiddleResult,1000*60)
    },
    //组件渲染完毕
    mounted() {
        this.getMemberNames();
    },
    //销毁之前
    beforeDestroy(){
        console.log('执行销毁....');
        clearInterval(this.interval);
    }


}
</script>

<style lang="css">
</style>
