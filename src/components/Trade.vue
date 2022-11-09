<template>
  <div>
    <p>Oferte: {{trade.offer}}</p>
    <p>Pedido: {{trade.request}}</p>
    <p>ID del Trade: {{trade.tradeId}}</p>



    <div v-if="!filter">
      <p>Respuestas:</p>
      <div v-for="(comprador, index) in trade.counterOffers" :key="index" >
        <div v-if="comprador.status === 'send'">
          <p>{{comprador.message}}</p>
          <p>{{comprador.userId}}</p>
          <button @click="updateTrade(comprador.id, comprador.userId)">Aceptar intercambio</button>
        </div>
      </div>
    </div>

    <div>
      <div v-if="filter">
        <p>Ingrese el punto de encuentro y detalles</p>
        <input type="text" v-model="point">
      </div>

      <button v-if="filter" @click="postContraOffer()">Intercambiar</button>
      {{this.message}}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyTrade",
  props: {
    trade: {
      type: Object,
      required: true,
    },
    filter: {
      type: Boolean,
      required: true
    }

  },
  data: () => ({
    cardAmount: null,
    point: null,
    message: null,
  }),
  methods: {
    postContraOffer() {
      let body = this.trade
      let newOffer = {
        "userId": this.$route.params.id,
        "message": this.point,
        "status": "send",
        "id": "TDO" + Math.random().toString(16).slice(2)
      }

      body['counterOffers'].push(newOffer)

      axios.put("http://localhost:5000/api/v1/trades/" + this.trade.tradeId, body)
          .then(response => {
            if (response.data.status === "304") {
              this.message = "TradeId incorrect"
            } else {
              this.message = "Oferta realizada"
            }
          })
          .catch(err => {
            console.log(err)
            // this.$router.push("/error-server")
          })

    },

    updateTrade(offerId, compradorId) {
      let body = this.trade
      let find = body.counterOffers.find(offer => offer.id === offerId)
      find.status = 'Acept'

      axios.put("http://localhost:5000/api/v1/trades/" + this.trade.tradeId, body)
          .then(response => {
            if (response.data.status === "304") {
              this.message = "TradeId incorrect"
            } else {
              this.message = "Oferta Aceptada"

              axios.delete("http://localhost:5000/api/v1/users/" + this.trade.publisher + "cards?card_id=" + this.trade.offer)
                  .then(response => {
                    console.log(response.data.message);
                    axios.delete("http://localhost:5000/api/v1/users/" + compradorId + "cards?card_id=" + this.trade.request)
                        .then(response => {
                          console.log(response.data.message);

                          let addCardComprador = {
                            "amount": 1,
                            "id": this.trade.offer
                          }

                          let addCardVendedor = {
                            "amount": 1,
                            "id": this.trade.request
                          }
                          axios.post("http://localhost:5000/api/v1/users/" + compradorId + "cards", addCardComprador)
                              .then(response => {
                                console.log(response.data.message)

                                axios.post("http://localhost:5000/api/v1/users/" + this.trade.publisher + "cards", addCardVendedor)
                                    .then(response => {
                                      console.log(response.data.message);

                                      axios.delete("http://localhost:5000/api/v1/trades/" + this.trade.tradeId)
                                          .then(response => {
                                            console.log(response.data.message);
                                          })
                                          .catch(err => {
                                            console.log(err)
                                            // this.$router.push("/error-server")
                                          })
                                    })
                              })

                        })
                  })




            }
          })
          .catch(err => {
            console.log(err)
            // this.$router.push("/error-server")
          })
    },
    getUserData(id) {

      axios.get("http://localhost:5000/api/v1/users/" + id)
          .then(response => {
            return response.data.user.name +" "+ response.data.user.lastname;
          })
          .catch(err => {
            console.log(err)
            // this.$router.push("/error-server")
          })

    }
  }
}
</script>

<style scoped>

</style>