<template>
  <img alt="dice logo" src="./assets/dice.jpg">
  <gamble-game msg="Welcome to the Dice Gamble Game"/>
</template>

<script>
import GambleGame from "./components/GambleGame.vue"
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components: {
    GambleGame,
  },
  computed: {
    ...mapGetters(['contract'])
  },
  async created() {
    await this.$store.dispatch('initNear');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
