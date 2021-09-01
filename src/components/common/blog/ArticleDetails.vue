<template>
  <div className="articles-area">
    <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
      <div>
        <div><h1><strong>标题：</strong></h1></div>
        <div style="text-align: center"><span style="font-size: 20px;"><strong>{{ article.article_title }}</strong></span></div>
        <div><h1><strong>内容：</strong></h1></div>
        <div class="markdown-body" style="padding-left: 50px">
          <div  v-html="article.article_content_html"></div>
        </div>
        <el-divider content-position="left">{{ article.article_date }}</el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import "github-markdown-css"
export default {
  name: 'ArticleDetails',
  data() {
    return {
      article: []
    }
  },
  mounted() {
    this.loadArticle()
  },
  methods: {
    loadArticle() {
      const _this = this
      this.$axios.get('/article/' + this.$route.query.id).then(resp => {
        if (resp && resp.status === 200) {
          _this.article = resp.data
        }
      })
    }
  }
}
</script>

<style scoped>
</style>

