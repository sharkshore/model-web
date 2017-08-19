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


  <el-tag type="gray">以下是参数列表</el-tag>
<!--  <div v-for="(p,index) in searchForm.parameters">
	  <el-form-item :label="p"  prop="sqlParamValues">
	    <el-input v-model="searchForm.sqlParamValues" style="width:215px"></el-input>
	  </el-form-item>
  </div>-->

  <el-form-item>
    <el-button type="primary" @click="submitForm('searchForm')">执行SQL</el-button>
    <el-button @click="resetForm('searchForm')">重置</el-button>
  </el-form-item>



</el-form>

<p>
	显示执行SQL的结果数据
</p>

</div>

</template>

<script>

import { queryMemberName ,querySqlModel } from '../../api/api';

export default {
	data(){
		return {
		    memberNames:[],//商户所有名字,下拉列表
            sqlModels:[],//商户所有名字,下拉列表
			searchForm:{
				memberName:'',
                execType:'',
				parameters:['name','address','email'],
				sqlParamValues:[]
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

			}
		}
	},
	methods:{
	    //点击执行SQL按钮
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.searchForm);
					alert('submit!');
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
        //更换商户名称
        changeMember(memberName){
            //调用接口
            querySqlModel({memberName}).then(res => {
                if (res.success) {
                    this.sqlModels = res.data
                    if(Array.isArray(res.data) && res.data[0].EXEC_TYPE){
                        this. searchForm.execType=res.data[0].EXEC_TYPE
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
        }


	},

    //组件渲染完毕
    mounted() {
        this.getMemberNames();
    },


}
</script>

<style lang="css">
</style>
