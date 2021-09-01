<template>
  <div class="m-content">
    <el-form :model="article" ref="article" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model = "article.article_title"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea"
                  v-model="article.article_abstract"
                  rows = "6"
                  maxlength = "255"
                  show-word-limit
                  placeholder="最多输入255字"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor
            v-model="article.article_content_md"
            ref=md
            @save = "saveArticles">
        </mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveArticles">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ArticleEditor",
  data(){
    return{
      article:{
        article_date:new Date()
      },
    }
  },
  mounted (){
    if(this.$route.params.article){
      this.article = this.$route.params.article
    }
    this.created()
  },
  methods:{
    saveArticles(){
      //value是md，render是html
      this.$confirm('是否保存并发布Blog','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        this.$axios
          .post("/blog/article",{
            id: this.article.id,
            article_title: this.article.article_title,
            article_content_md: this.$refs.md.value,
            article_content_html: this.$refs.md.d_render,
            article_abstract: this.article.article_abstract,
            article_date: this.article.article_date
          }).then(resp => {
            if(resp && resp.status === 200){
              this.$message({
                type: 'info',
                message: '已成功保存'
              })
            }
        })
      }).catch( () => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    },
    created(){
      const blogId = this.router.params.id
      console.log(blogId)
      const _this = this
      if(blogId){
        this.axios.get('/api/article/'+blogId)
          .then(res => {
            _this.article.title = res.data.article_title
            _this.article_date = res.data.article_date
            _this.article_content_md = res.data.article_content_md

          })
      }
    }


  }
}
</script>

<style scoped>

</style>
