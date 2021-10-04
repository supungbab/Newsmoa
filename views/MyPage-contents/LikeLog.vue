<template>
<div>
  <div v-if="!isListNull">
    남긴 좋아요가 없습니다.
  </div>

  <div v-if="isListNull">
    <NewsCompact v-for="(item, i) in likeUser" v-bind:items="likeUser[i]" v-bind:key="i" />
  </div>
</div>
</template>

<script>
import NewsCompact from '@/components/NewsCompact.vue'
import * as BoardsApi from '@/api/BoardsApi';

export default {
  name: 'LikeLog',
  components: {
    NewsCompact
  },
  data() {
    return {
      likeUser : []
    }
  },
  computed: {
    isListNull() {
      return (this.likeUser.length === 0) ? false : true;
    }
  },
  created(){
    BoardsApi.getLikeUser(this.$cookies.get("user")).then(res=>{
      this.likeUser = res.data.likeUser;
      console.log(this.likeUser)
    }).catch(err=>{
      console.log(err);
    })
  }
}
</script>
