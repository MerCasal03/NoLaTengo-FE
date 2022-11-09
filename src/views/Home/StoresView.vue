<template>
  <div class="container">
    <form class="locations">
      <select class="form-select" name="loc" id="loc">
        <option value="none" selected>Seleccione provincia</option>
        <option value="CABA">CABA</option>
        <option value="provincia">Provincia</option>
        <option value="all">Ver todas</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: "StoresVIew",
  components: {

  }
}
</script>

<style scoped>
.form-select {
  margin-left: -100%;
  width: 300%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 0.375rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.container{
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #e4a82f;
  height: 100vh;
  margin-top: -9%;

}
</style>