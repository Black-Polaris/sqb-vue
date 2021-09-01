<template>
  <div style="margin-top: 40px">
    <el-button @click="addArticle">添加Blog</el-button>
    <div class="articles-area">
      <div v-for="article in articles" :key="article.id">
        <el-card style="text-align: left">
          <div style="float:left;width:85%;height: 150px;">
            <router-link class="article-link" :to="{path:'blog/articleDetails',query:{id: article.id}}"><span style="font-size: 20px"><strong>{{article.article_title}}</strong></span></router-link>
            <el-divider content-position="left">{{article.article_date}}</el-divider>
            <router-link class="article-link" :to="{path:'blog/articleDetails',query:{id: article.id}}"><p>{{article.article_abstract}}</p></router-link>
          </div>
        </el-card>
      </div>
    </div>
    <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :page-size="size"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'BlogIndex',
  data () {
    return {
      articles: [],
      size: 2,
      total: 0
    }
  },
  mounted () {
    this.loadArticles()
  },
  methods: {
    addArticle(){
      this.$router.push('/blog/article')
    },
    loadArticles () {
      const _this = this
      this.$axios.get('/blog/' + '1/' + this.size).then(resp => {
        console.log('/blog/' + '1/' + this.size)
        if (resp && resp.status === 200) {
          _this.articles = resp.data.list
          _this.total = resp.data.total
          console.log(resp.data)
        }
      })
    },
    handleCurrentChange (page) {
      const _this = this
      this.$axios.get('/blog/' + page +'/'+ this.size).then(resp => {
        if (resp && resp.status === 200) {
          _this.articles = resp.data.list
          _this.total = resp.data.total
        }
      })
    }
  }
}
</script>

<style scoped>
.articles-area {
  width: 990px;
  height: 750px;
  margin-left: auto;
  margin-right: auto;
}

.article-link {
  text-decoration: none;
  color: #606266;
}

.article-link:hover {
  color: #409EFF;
}
</style>

