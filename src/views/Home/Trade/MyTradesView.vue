<template>
  <div>
    <h3>My Trades</h3>
    <button @click="newTrade = true" >Add Trade</button>
    <div v-if="newTrade">
      <p>Ingresa el ID cual ofreces</p><input type="text" v-model="offer">
      <p>Ingresa el ID cual queres a cambio</p><input type="text" v-model="request">
      {{this.message}}
      <button @click="postTrade()">Crear trade</button>
    </div>

    <Trade v-for="(trade, index) in myTrades" :key="index" :trade="trade" :filter="false"></Trade>

  </div>
</template>

<script>
import axios from "axios";
import Trade from "@/components/Trade";

export default {
  name: "MyTradesView",
  components: {Trade},
  data: () => ({
    newTrade: false,
    offer: null,
    request: null,
    message: null,
    userCards: null,
    trades: null,
    myTrades: null,
    isHidden: false,
  }),
  beforeMount() {
    axios.get("http://localhost:5000/api/v1/users/" + this.$route.params.id)
        .then(response => {
          this.userCards = response.data.user.cards
        })
        .catch(err => {
          console.log(err)
          // this.$router.push("/error-server")
        })

    axios.get("http://localhost:5000/api/v1/trades")
        .then(response => {
          this.trades = response.data.trades
          this.myTrades = this.trades.filter(trade => trade.publisher === this.$route.params.id);
        })
        .catch(err => {
          console.log(err)
          // this.$router.push("/error-server")
        })

  },

  methods: {
    postTrade() {
      let body = {
        "offer": this.offer,
        "request": this.request,
        "publisher":this.$route.params.id,
        "counterOffers":[]
      }

      if (this.offer === this.request) {
        this.message = "Las cards deben ser distintas"
        return;
      }

      let findOffer = this.userCards.find(card => card.id === this.offer)
      let findRequest = this.userCards.find(card => card.id === this.request)

      if(findOffer !== undefined && findRequest === undefined) {
        if(findOffer.amount > 1) {
          axios.post("http://localhost:5000/api/v1/trades", body)
              .then(response => {
                this.message = response.data.message

              })
              .catch(err => {
                console.log(err)
                // this.$router.push("/error-server")
              })
        } else {
          this.message = "Debes contar con la card repetida para poder cambiarla";
        }
      } else {
        this.message = "Verificar tener la card que ofreces y NO tener la que intentas pedir";
      }

    }
  }
}
</script>

<style scoped>
h3{
  font-family: "Comfortaa", cursive;
  color: black;
  margin-left: 40%;
}
p{
  font-family: "Comfortaa", cursive;
  color: black;
  margin-left: 40%;
}
input{
  width: 80%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 0.375rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  margin-left: 25%;
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