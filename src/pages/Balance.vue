<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">Wallet Balance</h4>
            <p class="category">Ether Ether Ether</p>
          </md-card-header>

          <md-card-content>
            <md-field>
              <label>Wallet address</label>
              <md-input v-model="walletAddress"></md-input>
            </md-field>

            <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-raised md-success" v-on:click="getBalance">Check address balance</md-button>
            </div>
          </md-card-content>
        </md-card>
        <md-card v-if="walletBalance" class="md-card-profile">
          <md-card-content>
            <h4 class="card-title">Balance</h4>
            Fake USDC Balance: {{ walletBalance }}
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Balance",
  data: () => ({
    walletAddress: "",
    walletBalance: ""
  }),
  methods: {
    getBalance: function() {
      console.log(this.walletAddress);
      let tokenAddress = "0x68ec573C119826db2eaEA1Efbfc2970cDaC869c4";
      let walletAddress = this.walletAddress;

      // The minimum ABI to get ERC20 Token balance
      let minABI = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function"
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function"
        }
      ];

      // Get ERC20 Token contract instance
      let contract = web3.eth.contract(minABI).at(tokenAddress);

      // Call balanceOf function
      contract.balanceOf(walletAddress, (error, balance) => {
        // Get decimals
        contract.decimals((error, decimals) => {
          // calculate a balance
          this.walletBalance = balance.div(10 ** decimals);
          console.log(balance.toString());
        });
      });
    }
  }
};
</script>
