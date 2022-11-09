<template>
  <div :class="{'grey-card': isActive(card.id)}">
    <img :src="card.url" width="10%">

    <p>{{card.country }}</p>
    <p>{{card.name }}</p>
    <p>{{card.lastname }}</p>
    <p>{{card.id }}</p>


    <button v-if="isActive(card.id)" @click="addCard(card.id)">Agregar Figurita a la coleccion</button>
    <p>AGREGAR TAMB PARA RESTAR LA CANT</p>

    <div v-if="!isActive(card.id)">
      <input type="number" v-model="cardAmount">
      <button @click="updateAmount(card.id, Number(cardAmount))">Guardar Cambios</button>
    </div>


    <button v-if="!isActive(card.id)" @click="deleteCard(card.id)">Eliminar de la Coleccion</button>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Card-Player",
  props: {
    card: {
      type: Object,
      required: true,
    },
    userCards: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    cardAmount: null,
  }),
  beforeMount() {
    this.cardAmount = this.getAmount(this.card.id)
  },

  methods: {
    isActive(id) {
      let find = this.userCards.find(card => card.id === id)
      if (find === undefined) {
        return true
      } else {
        return false
      }
    },

    getAmount(id) {
      let find = this.userCards.find(card => card.id === id)
      if (find === undefined) {
        return 0
      } else {
        return find.amount
      }
    },
    updateAmount(id, amount) {
      console.log(amount)

      let body = {"amount": amount + 1};
      axios.put("http://127.0.0.1:5000/api/v1/users/" + this.$route.params.id + "/cards?card_id=" + id, body)
          .then(response => {
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
            // this.$router.push("/error-server")
          })
      window.location.reload();
    },
    addCard(id) {
      let body = {
        "amount": 1,
        "id": id
      }
      axios.post("http://127.0.0.1:5000/api/v1/users/" + this.$route.params.id + "/cards", body)
          .then(response => {
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
            // this.$router.push("/error-server")
          })
      window.location.reload();
    },

    deleteCard(id) {
      axios.delete("http://127.0.0.1:5000/api/v1/users/" + this.$route.params.id + "/cards?card_id=" + id)
          .then(response => {
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
            // this.$router.push("/error-server")
          })
      window.location.reload();
    }
  },

}
</script>

<style scoped>
.grey-card {
  filter: grayscale(100%);
}
</style>