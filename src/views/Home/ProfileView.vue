<template>
  <div class="profile">
    <router-link :to="{name: 'collection'}"><button>My Collection</button></router-link>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: "ProfileView"
}
</script>

<style scoped>
.profile{
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #e4a82f;
  height: 109vh;
  margin-top: -9%;
}
button{
  width: 150%;
  height: 50px;
  background: #8e1f30;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 25px;
  position: relative;
  overflow: hidden;
  padding-left: 2px;
  margin-top: 5%;
  text-decoration: none;
}
button:hover{
  background-color: #e4a82f;
  text-decoration: none;
  border: #8e1f30 solid;
}
</style>