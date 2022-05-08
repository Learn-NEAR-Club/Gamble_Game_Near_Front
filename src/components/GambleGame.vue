<template>
  <main>
    <header  style="align-items: center; justify-content: space-between;">
      <div align="center">
        <h1 align="center" title="log in and gamble to get 6X the prize">Dice Gamble game</h1>
        <button align="center" title="This enables your link to near testnet" @click="currentUser ? signOut() : signIn()">
          {{ currentUser ? 'Log Out' : 'Log In' }}
        </button>
      </div>
    </header>
    <template v-if="currentUser">
      <h3>Hi, {{currentUser.accountId}}, your balance is {{currentUser.balanceInNear}} Near</h3>
      <p class="highlight">
        <label for="gamble">Maximum : {{gambleLimit}} Near </label>
        <button @click="refresh()"> Refresh</button>
        
      </p>
      <p class="highlight">
        <label for="gamble">Gamble:</label>
        <input autocomplete="off" v-model="gamble" autofocus id="gamble" type="number" required/>
        <button @click="gamblegame()">Gamble</button>
      </p>
      <p class="highlight">
        <label for="sponsor">Sponsor:</label>
        <input autocomplete="off" v-model="sponsor" autofocus id="sponsor" type="number" required/>
        <button @click="sponsorus()">Sponsor us</button>
      </p>
    </template>
    <template v-else>
      <p>
        Kindly sign in to play the game. You may get 6X the price when your rolling ends up with a 6.
      </p>
    </template>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import { Big } from 'big.js';

export default {
  name: 'GambleGame',
  computed: {
    ...mapGetters(['currentUser', 'contract', 'wallet', 'nearConfig'])
  },
  data() {
    return {
      gambleLimit : 0,
      gas: Big(3).times(10 ** 13).toFixed(),
    };
  },

  async created(){
    console.log("created")
    console.log(sessionStorage.getItem('gambleLimit'))
    if (sessionStorage.getItem('gambleLimit')) {
      this.gambleLimit = sessionStorage.getItem('gambleLimit')
    }
  },

  async mounted() {
    var that  = this
      console.log("Mount")
      setInterval(
        () => {
          console.log("refresh")
          that.refresh()
          },3000
      )
  },
  
  methods: {
    // Sign in
    signIn() {
      this.wallet.requestSignIn(
        this.nearConfig.contractName,
        'Near Gamble Game'
      );
    },
    signOut() {
      this.wallet.signOut();
      window.location.replace(window.location.origin + window.location.pathname)
    },
    async gamblegame(){
      try{
        await this.contract.gamble(
          {},
          this.gas,
          Big(this.gamble).times(10**24).toFixed()
        );
      }catch (e) {
        console.log(e);
      }
    },
    async sponsorus(){
      try{
        await this.contract.sponsor(
          {},
          this.gas,
          Big(this.sponsor).times(10**24).toFixed()
        );
      }catch (e) {
        console.log(e);
        alert('Something went wrong! Check the console.');
      }
    },
    async refresh(){
      this.gambleLimit = await this.contract.get_maximum_gamble_price()
      this.gambleLimit = this.gambleLimit / (10 ** 24)
      sessionStorage.setItem('gambleLimit',this.gambleLimit)
    }
  }
};
</script>