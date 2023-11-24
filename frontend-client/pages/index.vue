<script setup lang="ts">
const controls = reactive({ page: 1, limit: 10, search: null });
const {
  data: catalogues,
  pending,
  refresh,
} = await useAsyncData(() =>
  $fetch(
    `http://192.168.1.38:4001/catalogues?item=${controls.search}&page=${controls.page}&limit=${controls.limit}`
  )
);

watch(controls, useDebounce(refresh, 700) as any, { immediate: true });
</script>
<template>
  <div>
    <div
      class="max-w-3xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg"
    >
      <main
        class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 text-gray-600 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primaradaddy-400"
      >
        <div class="flex w-full justify-between">
          <input
            v-model="controls.search"
            type="text"
            placeholder="Search Item"
            class="h-12p-4 border-2 border-gray-300 mt-1 w-1/2 rounded-md shadow-sm"
          />
          <CatalogueForm @refresh="refresh" />
        </div>
        <div class="py-7 grid grid-cols-4 gap-4">
          <div class="grid-header">Date</div>
          <div class="grid-header">Name</div>
          <div class="grid-header">Cost</div>
          <div class="grid-header">Supplier</div>
        </div>
        <div
          v-if="!pending && !catalogues.length"
          class="text-center dark:text-white"
        >
          No Records.
        </div>
        <div
          v-else
          v-for="(item, i) in (catalogues as any)"
          :key="i"
          class="grid grid-cols-4 gap-4 border-b dark:text-gray-300 hover:border-zinc-800 dark:border-zinc-800 dark:hover:border-zinc-50"
        >
          <div class="grid-cell">
            {{ item.date }}
          </div>
          <div class="grid-cell">{{ item.name }}</div>
          <div class="text-right grid-cell">{{ item.cost }}</div>
          <div class="grid-cell">{{ item.supplier }}</div>
        </div>
      </main>
      <footer class="mt-10 dark:bg-gray-800">
        <div class="text-sm flex justify-between">
          <div class="lg:ml-44" />
          <div class="flex gap-2">
            <button
              class="px-4 text-white dark:bg-transparent hover:border bg-gray-400 rounded-lg"
              @click="controls.page > 1 ? controls.page-- : null"
            >
              &#8592;
            </button>
            <span class="mt-2">{{ controls.page }}</span>
            <button
              class="px-4 text-white dark:bg-transparent hover:border bg-gray-400 rounded-lg"
              @click="controls.page++"
            >
              &#8594;
            </button>
          </div>

          <div class="dark:text-gray-800 text-right">
            <input
              type="number"
              v-model="controls.limit"
              id="dataLimit"
              class="px-2 py-1 text-center border-2 border-gray-300 mt-1 w-1/2 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Limit"
              min="1"
            />
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<style scoped>
.grid-header {
  font-weight: bold;
  padding: 10px;
  background: #f0f0f0;
  border: 1px solid rgb(209, 209, 209);
}

.grid-cell {
  padding: 10px;
}
</style>
