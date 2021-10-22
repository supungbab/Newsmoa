<template>
  <li class="comment-box">
    <div class="comment">
      <a href="">
        <img
          src="@/assets/image/default/user.png"
          alt=""
          class="comment__user-img"
        />
      </a>
      <div>
        <div class="comment__header">
          <a href="">
            <h1 class="comment__user-name">{{ items.nickname }}</h1>
          </a>
          <span class="comment__time">{{ time }}</span>
        </div>
        <p class="comment__contents">
          {{ items.comment }}
          <!--<button class="comment__contents-btn" type="button">
            더보기
          </button>-->
        </p>
      </div>
    </div>
    <button
      v-if="isMyComment"
      @click="delComment"
      class="comment__del-btn btn--link"
    >
      삭제
    </button>
  </li>
</template>

<script>
import * as BoardsApi from "@/api/BoardsApi";

export default {
  name: "Comment",
  props: {
    items: { type: Object },
  },
  data() {
    return {
      time: "",
      isMyComment: true,
    };
  },
  created() {
    let tt = Math.floor(
      (new Date() - new Date(this.items.createdAt)) / 1000 / 60
    );
    //console.log(tt)
    if (tt < 60) {
      this.time = tt + "분 전";
    } else if (tt < 3600) {
      this.time = Math.floor(tt / 60) + "시간 전";
    } else {
      this.time = Math.floor(tt / 3600) + "일 전";
    }
  },
  methods: {
    delComment() {
      let commentIdx = {
        index: this.items.index, // 댓글 인덱스
        idx: this.items._id
      };
      if(confirm("댓글을 삭제 하시겠습니까?")){
        console.log(commentIdx);
        BoardsApi.deleteComment(this.$route.params.index,commentIdx,this.$cookies.get("userToken"))
          .then((res) => {
            console.log(res.data);
            this.$emit('update');
          })
          .catch(() => {
            alert("삭제하실 수 없습니다.");
          });
      }
    },
  },
};
</script>

<style scoped>
.comment-box {
  position: relative;
}

.comment {
  margin-bottom: 10px;
}

.comment__user-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.comment__user-name {
  font-size: 16px;
  margin-right: 5px;
}

.comment__time {
  font-size: 12px;
}

.comment {
  display: flex;
  font-size: 14px;
}

.comment__header {
  display: flex;
  align-items: baseline;
}

.comment__contents {
  position: relative;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  max-height: 60px;
  line-height: 20px;
  overflow: hidden;
}

.comment__contents-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border: 0;
}

.comment__del-btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
  font-weight: normal;
  text-decoration: underline;
  font-size: 14px;
}
</style>