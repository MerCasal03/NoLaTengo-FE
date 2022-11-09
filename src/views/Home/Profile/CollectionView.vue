<template>
  <div>


    <div v-for="(country, index) in countries" :key="index+5">
      <button @click="selectCountry(country)">{{country}}</button>
    </div>

    <Card v-for="(card, index) in cards" :key="index" :card="card" :userCards="userCards"></Card>

  </div>
</template>

<script>
import axios from "axios";
import Card from "@/components/MyCollection/Card-Player";

export default {
  name: "CollectionView",
  components: {Card},
  data: () => ({
    cards: null,
    countries: ['ARG', 'GER'],
    country: null,
    userCards: null,
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
  },
  methods: {
    selectCountry(country) {
      this.country = country;
      this.getCards();
    },

    getCards() {
      axios.get("http://localhost:5000/api/v1/attachments?country=" + this.country)
          .then(response => {
            this.cards = response.data.cards
          })
          .catch(err => {
            console.log(err)
            // this.$router.push("/error-server")
          })
    },

  }
}
</script>

<style scoped>
button{
  width: 150%;
  height: 50px;
  background: white;
  color: black;
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
  text-decoration: none;
  border: black solid;

}
</style>