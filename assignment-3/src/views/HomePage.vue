<template>
  <ion-page>
    <ion-content>
      <div class="refresh-btn-wrapper">
        <ion-button @click="fetchData">Refresh</ion-button>
      </div>

      <div v-if="loading" class="loading">Memuat data...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <div v-for="coin in coins" :key="coin.id" class="coin-item">
        <div class="coin-left">
          <div class="coin-rank-label">Rank</div>
          <div class="coin-rank">{{ coin.rank }}</div>
        </div>

        <div class="coin-middle">
          <div class="coin-name">{{ coin.name }}</div>
          <div class="coin-symbol">{{ coin.symbol }}</div>
        </div>

        <div class="coin-right">
          <div class="coin-currency">USD</div>
          <div class="coin-price">{{ coin.price_usd }}</div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { IonButton, IonContent, IonPage } from "@ionic/vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonPage,
    IonContent,
    IonButton,
  },
  data() {
    return {
      coins: [] as any[],
      loading: false,
      error: "",
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = "";

      try {
        const response = await axios.get("https://api.coinlore.net/api/tickers/");
        this.coins = response.data.data;
      } catch (error) {
        this.error = "Gagal mengambil data. Coba lagi.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
});
</script>

<style scoped>
.refresh-btn-wrapper {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}

.loading,
.error {
  text-align: center;
  padding: 16px;
  color: #888;
}

.error {
  color: red;
}

.coin-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  background-color: #fdf9e3;
  padding: 8px 12px;
}

.coin-left {
  width: 60px;
  text-align: center;
}

.coin-rank-label {
  font-size: 11px;
  color: #666;
}

.coin-rank {
  font-size: 20px;
  font-weight: bold;
  color: #000;
}

.coin-middle {
  flex: 1;
  padding: 8px;
}

.coin-name {
  font-size: 12px;
  color: #444;
}

.coin-symbol {
  font-size: 22px;
  font-weight: bold;
  color: #000;
}

.coin-right {
  text-align: left;
  min-width: 90px;
}

.coin-currency {
  font-size: 12px;
  color: #444;
}

.coin-price {
  font-size: 16px;
  color: #000;
}
</style>
