<template>
  <div class="museo">
    <museo/>
  </div>
</template>

<script>
import Museo from "@/components/museo";
export default {
  name: "MuseoView",
  components:{
    Museo

  }
}
</script>

<style scoped>
.museo{
  background-color: #e4a82f;
  height: 300vh;
  margin-top: -9%;
}
</style>