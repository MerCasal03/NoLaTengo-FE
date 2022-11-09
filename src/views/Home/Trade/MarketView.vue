<template>
  <div>
    <h3>Market</h3>
    <Trade v-for="(trade, index) in tradesFilter" :key="index" :trade="trade" :filter="true"></Trade>
  </div>
</template>

<script>
import axios from "axios";
import Trade from "@/components/Trade";

export default {
  name: "MarketView",
  components: {Trade},
  data: () => ({
    tradesFilter: null,
  }),
  beforeMount() {

    axios.get("http://localhost:5000/api/v1/trades")
        .then(response => {
          let trades = response.data.trades
          this.tradesFilter = trades.filter(trade => trade.publisher != this.$route.params.id);
        })
        .catch(err => {
          console.log(err)
          // this.$router.push("/error-server")
        })

  },
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
</style>