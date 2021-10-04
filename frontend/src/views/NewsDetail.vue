<template>
  <div class="wrap--main">
      <section class="main news-detail">
        <div class="news-detail__header">
          <div>{{newsDetail.media}}</div>
          <h1 class="news_detail__title">{{newsDetail.title}}</h1>

          <ul class="news-detail__info">
            <li><span class="icon__time blind"></span>{{newsDetail.date}}</li>
            <li><span class="icon__comment blind"></span> 댓글 {{commentCnt}}</li>
            <li><span class="icon__like blind"></span> 좋아요 {{likeCnt}}</li>
          </ul>
        </div>

        <div class="news-detail__contents">
          <img
            :src="newsDetail.topimg"
            alt=""
            class="news-detail__contents__img"
          />
          <p v-html="newsDetail.content"></p>
        </div>

        <div class="wrap--comment">
          <button class="news-detail__like-btn" :class="{'active' : likeBtn}" 
                  @click="[likeClick(), likeBtn = !likeBtn]" type="button">
            좋아요 {{likeCnt}}
          </button>
          
        </div>
        <section class="wrap--comment">
          <h1 class="title">
            댓글
            <span class="">{{commentCnt}}</span>
          </h1>

          <div class="comment_list">
            <p v-if="!isCommentNull" class="comment_list__empty">댓글이 없습니다</p>
            <ol v-if="isCommentNull">
              <Comment v-for="(item, i) in newsComments" v-bind:items="newsComments[i]" v-bind:key="i"/>
            </ol>

            <form action="" class="comment__form">
              <textarea class="textarea" v-model="commentText" placeholder="욕설 차단 기능이 있습니다."></textarea>
              <button type='button' @click="comment" class="btn__sm--primary">입력</button>
            </form>
          </div>
        </section>
      </section>

      <aside class="aside">
         <section>
          <h1>토론방</h1>
          <br>
          <Debate />
          <!--
          <ol class="">
            <li><NewsCompact/></li>
          </ol>
          -->
        </section>
     </aside>

  </div>
</template>

<script>
import Comment from '@/components/Comment';
import Debate from '@/components/Debate';
import * as BoardsApi from '@/api/BoardsApi';
//import NewsCompact from '@/components/NewsCompact';

export default {
  name: 'NewsDetail',
  components: {
    Comment,
    Debate
    //NewsCompact
  },
  data() {
    return {
      commentCnt: 0,
      likeCnt:0,
      likeBtn: false,
      newsDetail:{type:Object},
      commentText:"",
      newsComments:{type:Array},
      newsLikes:{tpye:Array}
    }
  },
  created(){
    this.getBoard()
  },
  methods : {
      getBoard(){
        let vm=this;
        BoardsApi.getBoardDetail(vm.$route.params.index).then(res=>{
          //console.log(res.data.board);
          vm.newsDetail = res.data.board;
          let temp="";
          for(let i=0;i<this.newsDetail.content.length;i++){
            temp+=this.newsDetail.content[i];
            if(this.newsDetail.content[i]=='.'&&(!(0<=this.newsDetail.content[i-1]&&this.newsDetail.content[i-1]<=9)&&!('a'<=this.newsDetail.content[i+1]&&this.newsDetail.content[i+1]<='z')))
              temp+="<br><br>"
          }
          this.newsDetail.content = temp;
          //console.log(this.newsDetail)
        }).catch(err=>{
          console.log(err);
        });
        BoardsApi.getCommentDetail(vm.$route.params.index).then(res=>{
          //console.log("가져온다 댓글",res.data)
          vm.newsComments = res.data.comments
          vm.commentCnt=res.data.commentCount
        }).catch(err=>{
          console.log(err)
        })
        BoardsApi.getLikeDetail(vm.$route.params.index).then(res=>{
          //console.log("가져온다 좋아요",res.data)
          vm.likeCnt=res.data.likeCount
        }).catch(err=>{
          console.log(err)
        })
      },
      comment(){
        let commentData={
          index : Number(this.$route.params.index),
          user : this.$cookies.get("user"),
          nickname : this.$cookies.get("nickname"),
          comment : this.commentText
        }
        BoardsApi.postComment(this.$route.params.index, commentData, this.$cookies.get("userToken")).then(res=>{
          console.log(res.data);
          this.commentText="";
          this.getBoard();
          if(res.data.result=="curse"){
            alert("욕설이 감지되었습니다.");
          }
        }).catch(err=>{
          alert("로그인을 해주세요!");
          this.commentText="";
          console.log(err);
        })
      },
      likeClick(){
        let likeData={
          index : Number(this.$route.params.index),
          user : this.$cookies.get("user"),
          nickname : this.$cookies.get("nickname")
        }
        BoardsApi.putLike(this.$route.params.index, likeData, this.$cookies.get("userToken")).then(res=>{
          console.log(res.data);
          this.getBoard();
        }).catch(err=>{
          alert("로그인을 해주세요!");
          console.log(err);
        })
      },
      debate(){

      }
  },
  computed: {
    isCommentNull() {
      return (this.commentCnt === 0) ? false : true;
    }
  }
}
</script>

<style scoped>
.comment_list {
  padding: 0 15px;
}

.comment_list__empty {
  text-align: center;
  padding: 50px 0;
}

.news-detail__info {
  list-style: none;
  display: flex;
  margin: 5px 0 30px;
  font-size: 15px;
}

.news-detail__info li {
  padding-right: 10px;
}

.news-detail__info li span {
  padding:0 10px;
}

.news-detail__contents {
  margin-bottom: 30px;
}

.news-detail__contents__img {
  display: block;
  width: 60%;
  margin: 15px auto;
}

.comment__form {
  display: flex;
  margin: 25px 0;
}

.comment__form .btn__sm--primary {
  height: initial;
  border-radius: 0 3px 3px 0;
}

.textarea {
  border-radius: 3px 0 0 3px;
}

.news-detail__like-btn {
  outline: none;
  background: #fff;
  border: 1px solid var(--line-color-light);
  border-radius: 3px;
  font-size: 15px;
  padding: 10px 15px;
  margin-bottom: 30px;
  transition: all ease-in .2s;
}

.news-detail__like-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.news-detail__like-btn.active {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.news-detail__like-btn:active {
  background-color: var(--primary-color);
  border-color: var(--line-color-light);
  color: #fff;
}

@media (max-width: 1000px) {
  .aside {
    display: none;
  }

  .main {
    width: 100%;
  }
}
</style>
