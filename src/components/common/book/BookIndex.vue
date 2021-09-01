<template>
  <el-container>
    <el-aside style="width: 200px;margin-top: 20px">
      <switch></switch>
<!--      BookIndex获取SideMenu组件的data 通过ref属性设置一个引用名，-->
<!--      实现通过this.$refs.sideMenu来应用侧边导航栏的实例，并获取data-->
<!--      @indexSelect设置触发事件-->
      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
      <Books class="books-area" ref="booksArea"></Books>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from "./SideMenu";
import Books from "./Books";
export default {
  name: "BookIndex",
  components: {Books, SideMenu},
  methods:{
    listByCategory(){
      const _this = this
      const cid = this.$refs.sideMenu.cid
      const url = 'categories/' + cid + '/books'
      console.log(cid+"切换类型")
      this.$axios.get(url).then(resp =>{
        if(resp && resp.status === 200){
          _this.$refs.booksArea.books = resp.data
        }
      })
    }
  }
}
</script>

<style scoped>
  .books-area{

    margin-left: auto;
    right: auto;
  }
</style>
