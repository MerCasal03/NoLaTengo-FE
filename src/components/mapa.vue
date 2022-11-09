<template>
  <div id="mapaPuntos">

  </div>
</template>

<script>
export default {
  name: "mapaA",
  components: {
  }
}


</script>

<style scoped>
#mapaPuntos{
  height: 70vh;
  width: 80%;
  margin:-2% auto;
}
body {
  background-color: #e4a82f;
  font-size: 250%;
  overflow-x: hidden;
  font-family: "Comfortaa", cursive;
  box-sizing: border-box;
}
.container-menu-landing-page{
  margin-top: 2%;
  font-size: 45%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-decoration: none;
  font-family: 'Nunito', sans-serif;
  align-items: flex-start;
}
.header{
  width:105%;
  height:40%;
  left:-3%;
  position:absolute;
  background-image: linear-gradient(#8e1f30, #8e1f30);
  border-radius: 20% 20%;
  margin-top: -14%;
  z-index: -2;
  margin-left: 1%;
}
.container-menu-landing-page a:hover{
  color: #e4a82f;
  transform: scale(.9);
}
img{
  width: 170%;
  color: white;
}
.form-select{
  margin-top: 4%;
  margin-left: 10%;
  width: 80%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  border: 1px solid white;
  border-radius: 0.375rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

</style>