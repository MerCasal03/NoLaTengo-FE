<template>
  <div class="container-menu-landing-page">
    <router-link :to="{name: 'banner'}">Home</router-link>
    <router-link :to="{name: 'trade'}">Trade</router-link>
    <router-link :to="{name: 'stores'}">Stores</router-link>
    <router-link :to="{name: 'profile'}">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
      </svg>
    </router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "HomeView",
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&family=Nunito&display=swap');
a:-webkit-any-link{
  color: white;
  text-decoration: none;
  font-size: 200%;
  font-family: "Comfortaa", cursive;
  padding-left: 5%;
  padding-right: 5%;

}
a svg{
  width: 3%;
  height: 3%;
}
a:hover{
  color: #8e1f30;
}
</style>