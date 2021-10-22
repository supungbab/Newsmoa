<template>
<div>
  <div v-if="!isListNull">
    남긴 댓글이 없습니다.
  </div>

  <div v-if="isListNull">
    <CommentWithNews v-on:update="getCommentUser()" v-for="(item, i) in commentUser" v-bind:items="commentUser[i]" v-bind:key="i" />
  </div>
</div>
</template>

<script>
import CommentWithNews from '@/components/CommentWithNews.vue'
import * as BoardsApi from '@/api/BoardsApi';

export default {
  name: 'CommentLog',
  components: {
    CommentWithNews
  },
  data() {
    return {
      commentUser : []
    }
  },
  computed: {
    isListNull() {
      return (this.commentUser.length === 0) ? false : true;
    }
  },
  created(){
    this.getCommentUser();
  },
  methods:{
    getCommentUser(){
      BoardsApi.getCommentUser(this.$cookies.get("user")).then(res=>{
        this.commentUser=res.data.commentUser;
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>