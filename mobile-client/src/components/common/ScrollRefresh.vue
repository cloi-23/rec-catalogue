<template>
    <ion-infinite-scroll @ionInfinite="ionInfinite">
      <ion-infinite-scroll-content
        nite-scroll-content
      ></ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </template>
  <script setup lang="ts">
  import {
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    RefresherEventDetail,
  } from "@ionic/vue";
  
  const emit = defineEmits(["nextPage"]);
  const ionInfinite = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      emit("nextPage");
      event.target.complete();
    }, 500);
  };
  </script>
  