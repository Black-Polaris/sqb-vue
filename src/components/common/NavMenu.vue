<template>
  <el-menu :default-active="this.$route.path"
           router
           class="el-menu-demo"
           mode="horizontal"
           background-color="white"
           text-color="#222"
           active-text-color="red"
           style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key=i :index="item.name">
      {{item.navItem}}
    </el-menu-item>
    <a href="#nowhere" style="color: #222;float: right;padding: 20px">更多功能</a>
    <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px"></i>
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu",
  data(){
    return {
      navList:[
        {name:'/index',navItem:'首页'},
        {name:'/book',navItem: '书籍'},
        {name:'/blog',navItem: '个人博客'},
        {name:'/admin',navItem: '个人中心'}
      ]
    }
  },
  methods : {
    logout(){
      const _this = this;
      this.$axios.get('/logout')
        .then(resp => {
          if(resp.data.code === 200){
            _this.$store.commit('logout')
            _this.$router.replace('/login')
          }
        })
    }
  }
}
</script>

<style scoped>
.el-icon-switch-button{
  cursor: pointer;
  outline: 0;
}
</style>
