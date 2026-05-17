<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cuaca</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cuaca</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card class="weather-card">
        <ion-card-content>
          <div class="card-top">
            <div>
              <p class="city">JAKARTA</p>
              <p class="date">{{ currentDate }}</p>
            </div>
            <ion-icon :icon="sunny" class="icon-sun" />
          </div>

          <div class="current-temp">
            <span class="temp-value"> 32.5 </span>
            <span class="temp-unit"> °C </span>
          </div>

          <div class="temp-stats">
            <span>Tertinggi <strong>32.8°</strong></span>
            <span>Terendah <strong>24.7°</strong></span>
            <span>Rata-Rata <strong>28.2</strong></span>
          </div>
        </ion-card-content>
      </ion-card>

      <p class="section-label">Perkiraan per jam</p>

      <ion-list lines="full">
        <ion-item v-for="forecast in hourlyForecasts" :key="forecast.hour">
          <span slot="start" class="forecast-hour">{{ forecast.hour }}</span>
          <span slot="end" class="forecast-temp">{{ forecast.temp }}</span>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import EndPointAccess from "@/services/EndPointAccess";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonList, IonItem, IonIcon } from "@ionic/vue";
import { sunny } from "ionicons/icons";
import { onMounted, ref } from "vue";

const currentDate = new Date().toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const API_URL = "https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m";

const hourlyForecasts = ref<{ hour: string; temp: number }[]>([]);

onMounted(async () => {
  const api = new EndPointAccess(API_URL);
  const response = await api.getRes();
  const data = response.data as { hourly: { time: string[]; temperature_2m: number[] } };

  const { time, temperature_2m } = data.hourly;
  const todayStr = new Date().toISOString().slice(0, 10);
  hourlyForecasts.value = time.map((t, i) => ({ hour: t.slice(11, 16).replace(":", "."), temp: temperature_2m[i] })).filter((_, i) => time[i].startsWith(todayStr));
});
</script>

<style scoped>
.weather-card {
  margin: 16px;
  border-radius: 12px;
  background-color: var(--ion-color-light);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.city {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--ion-color-medium);
  margin: 0 0 2px;
}

.date {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin: 0;
}

.icon-sun {
  font-size: 32px;
  color: #f5a623;
}

.current-temp {
  margin: 12px 0 8px;
  line-height: 1;
}

.temp-value {
  font-size: 56px;
  font-weight: 300;
  color: var(--ion-color-dark);
}

.temp-unit {
  font-size: 20px;
  color: var(--ion-color-dark);
  vertical-align: super;
}

.temp-stats {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--ion-color-medium);
}

.section-label {
  margin: 8px 16px 4px;
  font-size: 15px;
  font-weight: 500;
  color: var(--ion-color-primary);
}

.forecast-hour {
  font-size: 20px;
  color: var(--ion-color-dark);
}

.forecast-temp {
  font-size: 15px;
  color: var(--ion-color-dark);
}
</style>
