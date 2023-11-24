<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Catalogues </ion-title>
      </ion-toolbar>
      <ion-toolbar>
          <ion-searchbar  class="fixed-searchbar" show-clear-button="focus"  :debounce="1000" @ionInput="handleSearch($event)"></ion-searchbar>
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
        <ion-toolbar>
          <ion-searchbar  class="fixed-searchbar" show-clear-button="focus" :debounce="1000" @ionInput="handleSearch($event)"></ion-searchbar>
    </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item v-if="catalogues?.length <=0 " class="list-item" :key="Date.now()">
          <ion-label class="ion-text-wrap">
            <h2 align="center">
            No record.
            </h2>
          </ion-label>
        </ion-item>
        <CatalogueListItem v-else v-for="catalogue in catalogues" :key="catalogue.catalogueID" :catalogue="catalogue" />
      </ion-list>

      <ScrollRefresh @next-page="nextPage" />
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
  IonSearchbar,
  IonLabel,
  IonItem
} from '@ionic/vue';
import CatalogueListItem from '@/components/CatalogueListItem.vue';
import ScrollRefresh from '@/components/common/ScrollRefresh.vue';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';

const catalogues = ref<any[]>([]);
const controls = ref({
  page:1,
  limit:10,
  item:null
})
  const nextPage = () => {
    controls.value.page += 1;
    fetchCatalogues()
};
 
const handleSearch = async(event:any)=>{
  const searchText = event.target.value.toLowerCase();
  controls.value.item = searchText
  controls.value.page = 1
  const data = await getCatalogues();
  catalogues.value = data
}
 const getCatalogues = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await axios.get(`${backendUrl}/catalogues?item=${controls.value.item}&page=${controls.value.page}&limit=${controls.value.limit}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching catalogues:', error);
    }
};


 const fetchCatalogues = async () => {
    const data = await getCatalogues();
    if (data) {
      catalogues.value.push(...data);
    }
};

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    controls.value.page=1
    controls.value.item=null
    fetchCatalogues()
    ev.detail.complete();
  }, 3000);
};

onMounted(()=>fetchCatalogues())
</script>
<style scoped>
.page-container {
  position: relative;
}


ion-content {
  margin-top: 56px; 
}
</style>
