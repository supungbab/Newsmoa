<template>
    <nav class="gnb">
        <ul class="gnb__menu">
          <li @click="check"><router-link :to="{name: 'Home', params: {category: ''}}">종합</router-link></li>
          <li @click="check"><router-link :to="{name: 'Category1', params: {category: '정치'}}">정치</router-link></li>
          <li @click="check"><router-link :to="{name: 'Category2', params: {category: '경제'}}">경제</router-link></li>
          <li @click="check"><router-link :to="{name: 'Category3', params: {category: '사회'}}">사회</router-link></li>
          <li @click="check"><router-link :to="{name: 'Category4', params: {category: '생활/문화'}}">생활/문화</router-link></li>
          <li @click="check"><router-link :to="{name: 'Category5', params: {category: '세계'}}">세계</router-link></li>
          <li @click="check"><router-link :to="{name: 'Category6', params: {category: 'IT/과학'}}">IT/과학</router-link></li>
        </ul>

        <form action="" class="gnb__search">
          <input type="text" class="input__sm"/>
          <button type="submit" class="btn__search">
            <span class="blind">검색</span>
          </button>
        </form>
      </nav>
</template>

<script>
export default {
    name: 'Nav',
    data(){
      return{
        chk:['','정치','경제','사회','생활/문화','세계','IT/과학'],
        category:localStorage.getItem('category')
      }
    },
    mounted(){
      let parent = document.getElementsByClassName('gnb__menu')[0].childNodes;
      let category=localStorage.getItem('category');
      if(category==null) category=''
      let index=this.chk.indexOf(category)
      let child=parent[index];
      child.className='active';
    },
    methods : {
      check(event){
        //console.log(document.getElementsByClassName('gnb__menu')[0].childNodes,event.currentTarget)
        let parent = document.getElementsByClassName('gnb__menu')[0].childNodes;
        //console.log(parent.length)
        for(let i=0;i<parent.length;i++){
          let child=parent[i];
          child.className='';
        }
        //document.getElementById('active').className='';
        event.currentTarget.className='active';
        //document.target.classList.add('active');
      }
    },
    watch:{
      category:function(){
        console.log("변함")
      }
    }
}
//https://velog.io/@skyepodium/vue-router%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%84%EB%8B%AC%ED%95%98%EA%B8%B0-eskrsmr3
// 데이터 전달 방법
</script>

<style scoped>
.gnb {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  height: 45px;
}

.gnb__menu {
  display: flex;
  box-sizing: border-box;
  list-style: none;
}

.gnb__menu li {
  box-sizing: border-box;
  width: 100px;
  line-height: 45px;
}

.gnb__menu a{
  display : block;
}

.gnb__menu a:not(.gnb__menu .active a) {
  transition: color ease-in .2s;
}

.gnb__menu a:hover {
  color: var(--primary-color);
}

.gnb__menu .active a {
  font-weight: bold;
  color: var(--primary-color);
  cursor: default;
}

.gnb__search {
  position: relative;
  display: flex;
}

.btn__search {
  background: transparent;
  border: 0;
}

.btn__search::before {
  position: absolute;
  content: '';
  width: 15px;
  height: 15px;
  top: 50%;
  right: 20px;
  transform: translate(0%, -50%);
  background: url(../../assets/image/icon/search.svg);
  background-size: 15px;
}

@media (max-width: 700px) {
  .gnb__menu {
    width: 100%;
  }
  
  .gnb__search {
    display: none;
  }
}
</style>