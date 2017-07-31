<template lang="html">
	<div class="">

<el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="MEMBER_NAME" label="商户名称" width="180"> </el-table-column>
    <el-table-column prop="EXEC_TYPE" label="SQL分类"> </el-table-column>
    <el-table-column prop="EXEC_SQL" label="SQL语句"> </el-table-column>
    <el-table-column prop="PARAMETERS" label="所有参数"> </el-table-column>
    <el-table-column prop="MSG" label="备注"> </el-table-column>
    <el-table-column prop="USER_NAME" label="用户"> </el-table-column>
    <el-table-column prop="CREATE_TIME" label="创建日期" width="180"> </el-table-column>
  </el-table>

	</div>

</template>

<script>
import {
	querySqlModel
} from '../../api/api';

export default {
	data() {
		return {
			tableData: [],
		}
	},

	methods: {
		getSqlList() {
			querySqlModel({}).then(res => {
					console.log(res);
				if (res.success) {
					console.log(res.data);
					this.tableData = res.data
				} else {
					this.$message.error(res.errorMsg)
				}
			}).catch(err => {
				console.log(err)
			})
		}
	},

	mounted() {
		this.getSqlList();
	},
}
</script>

<style lang="css">
</style>
