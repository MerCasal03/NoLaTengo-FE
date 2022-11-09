<template>
  <div class="menu">
    <router-link :to="{name: 'market'}"><button>Market</button></router-link>
    <router-link :to="{name: 'myTrades'}"><button>My Trades</button></router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TradeView",
  components:{
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&family=Nunito&display=swap');
h1{
  margin-top: 5%;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  font-family: "Comfortaa", cursive;
  color: black;
}
.menu{
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #e4a82f;
  height: 100vh;
  margin-top: -9%;

}
button{
  display: flex;
  align-items: center;
  justify-content: center;
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