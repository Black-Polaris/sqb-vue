<template>
  <div>
    <el-row style="height: 500px">
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>

      <el-tooltip effect="dark" placement="right"
                  v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span>
          <span>{{item.date}}</span>
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 400px" class="abstract">{{item.abs}}</p>

        <el-card style="width: 190px;margin-bottom: 20px;height: 320px;float: left;margin-right: 15px" class="book"
                  bodystyle="padding:10px" shadow="hover">
          <div class="cover" @click="editBook(item)">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
            <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
          </div>
          <div class="author">{{item.author}}</div>
        </el-card>
      </el-tooltip>
      <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
    </el-row>
    <el-row>
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import EditForm from "./EditForm";
export default {
  name: "Books",
  components: {EditForm, SearchBar},
  data(){
    return{
        books:[],
        currentPage:1,
        pagesize:4
    }
  },
  mounted: function (){
    this.loadBooks()
  },
  methods: {
    loadBooks(){
      const _this = this
      this.$axios.get('/books').then(resp => {
        if(resp && resp.status === 200){
          _this.books = resp.data
          console.log(_this.books)
        }
      })
    },
    handleCurrentChange: function (currentPage){
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    searchResult(){
      const _this = this
      this.$axios
        .get('/search?keywords=' + this.$refs.searchBar.keywords,{
        }).then(resp =>{
          if(resp && resp.status === 200){
            _this.books = resp.data
          }
      })
    },
    deleteBook(id){
      this.$confirm('此操作将永久删除该书籍，是否继续？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        console.log("删除")
        this.$axios
          .post('/delete',{id:id})
           .then(resp =>{
            console.log("删除成功")
            if(resp && resp.state === 200){
              console.log("删除测试")
            }
             this.loadBooks()
          })

      }
      ).catch(() =>{
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      })
    },
    editBook(item){
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover:item.cover,
        title:item.title,
        author: item.author,
        date: item.date,
        press:item.press,
        abs:item.abs,
        cid: item.cid

      }
    }
  }
}
</script>

<style scoped>
.cover {
  width: 150px;
  height: 250px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 150px;
  height: 250px;
  /*margin: 0 auto;*/
}

.title {
  font-size: 14px;
  text-align: left;
}

.author {
  color: #333;
  width: 102px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display: block;
  line-height: 17px;
}

.el-icon-delete{
  cursor: pointer;
  float: right;
}

.switch{
  display: flex;
  position: absolute;
  left: 780px;
  top:25px;
}
a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}
</style>
