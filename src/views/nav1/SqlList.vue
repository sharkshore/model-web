<template lang="html">

<el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="MEMBER_NAME" label="商户名称" width="180"> </el-table-column>
    <el-table-column prop="EXEC_TYPE" label="SQL分类"> </el-table-column>
    <el-table-column prop="EXEC_SQL" label="SQL语句"> </el-table-column>
    <el-table-column prop="PARAMETERS" label="所有参数"> </el-table-column>
    <el-table-column prop="MSG" label="备注"> </el-table-column>
    <el-table-column prop="USER_NAME" label="用户"> </el-table-column>
    <el-table-column prop="CREATE_TIME" label="创建日期" width="180"> </el-table-column>
    <el-table-column label="操作" >

     <template scope="scope">
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>

    </el-table-column>

  </el-table>


</template>

<script>
import { querySqlModel  ,delSqlModel } from '../../api/api';

export default {
	data() {
		return {
			tableData: [],
		}
	},

	methods: {
		getSqlList() {
			querySqlModel({}).then(res => {
				if (res.success) {
					this.tableData = res.data
				} else {
					this.$message.error(res.errorMsg)
				}
			}).catch(err => {
				console.log(err)
			})
		},
        handleDelete(index,row){
            delSqlModel({id:row.ID}).then(res => {
                if (res.success) {
                    this.getSqlList();
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
