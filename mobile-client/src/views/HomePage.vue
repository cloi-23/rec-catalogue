<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Catalogues</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Catalogue</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <CatalogueListItem v-for="catalogue in catalogues" :key="catalogue.catalogueID" :catalogue="catalogue" />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import CatalogueListItem from '@/components/CatalogueListItem.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';

// Reactive reference to hold catalogues data
const catalogues = ref<any[]>([]);

 const getCatalogues = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await axios.get(`${backendUrl}/catalogues?item=null&page=1&limit=10`);
        return response.data;
    } catch (error) {
        console.error('Error fetching catalogues:', error);
    }
};


 const fetchCatalogues = async () => {
    const data = await getCatalogues();
    if (data) {
        catalogues.value = data;
    }
};

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
onMounted(()=>fetchCatalogues())
</script>
