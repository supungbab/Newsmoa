<template>
     <aside class="aside">
         <TrendingList/>
     </aside>
</template>

<script>
import TrendingList from '@/components/TrendingList.vue'

export default {
    name: 'Aside',
    components: {
        TrendingList
    }
}
</script>

<style scoped>

</style>