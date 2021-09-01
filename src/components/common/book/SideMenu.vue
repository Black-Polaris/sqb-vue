<template>
  <el-menu
    default-active="0"
    @select="handleSelect"
    active-text-color="red">
    <el-menu-item index = "0">
      <i class="el-icon-menu"></i>
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item index = "1">
      <i class="el-icon-menu"></i>
      <span slot="title">文学</span>
    </el-menu-item>
    <el-menu-item index = "2">
      <i class="el-icon-menu"></i>
      <span slot="title">生活</span>
    </el-menu-item>
    <el-menu-item index = "3">
      <i class="el-icon-menu"></i>
      <span slot="title">科技</span>
    </el-menu-item>
    <el-menu-item index = "4">
      <i class="el-icon-menu"></i>
      <span slot="title">古典</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data(){
    return{
      cid:''
    }
  },
  methods:{
    handleSelect(key){
      this.cid = key
      this.$emit('indexSelect')
    }
  }
}
</script>

<style scoped>

</style>
