<template lang="html">
	<div class="">

<el-form :model="searchForm" :rules="rules" ref="searchForm" label-width="100px" class="demo-form-inline">

  <el-form-item label="商户名称" prop="memberName">
    <el-input v-model="searchForm.memberName" style="width:215px"></el-input>
  </el-form-item>

  <div class="" v-for="(p,index) in searchForm.parameters">
	  <el-form-item :label="p"  prop="sqlParamValues">
	    <el-input v-model="searchForm.sqlParamValues" style="width:215px"></el-input>
	  </el-form-item>
  </div>

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
export default {
	data(){
		return {
			searchForm:{
				memberName:'一个商户',
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
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	}

}
</script>

<style lang="css">
</style>
