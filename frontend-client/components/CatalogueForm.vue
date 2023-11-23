<script setup lang="ts">
const fields = ref({ items: [{ name: "", cost: 0 }] });
const formModal: any = ref(null);
const saveCatalogues = () => {
  console.log(fields.value);
};
const createNew = () => {
  fields.value.items = [{ name: "", cost: 0 }];
  formModal.value.showModal();
};
</script>
<template>
  <button
    class="block text-white dark:bg-blue-700 border-2 bg-gray-400 dark:hover:bg-blue-800 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    @click="createNew"
  >
    ADD +
  </button>
  <dialog
    ref="formModal"
    class="modal dark:bg-gray-800 border border-gray-300 rounded-md"
  >
    <div class="px-10">
      <h3 class="text-center">Add Items & Cost</h3>
      <div v-for="(field, i) in fields.items" :key="i" class="flex py-2">
        <input
          v-model="field.name"
          type="text"
          placeholder="Item Name"
          class="p-4 border-2 border-gray-300 form-input mt-1 block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div class="p-2" />
        <input
          v-model="field.cost"
          type="number"
          placeholder="Cost"
          class="p-4 border-2 border-gray-300 form-input mt-1 block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <div class="p-2" />
        <button
          @click="fields.items.splice(i, 1)"
          class="text-white my-2 dark:bg-gray-700 border-2 bg-gray-400 dark:hover:bg-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700"
        >
          -
        </button>
      </div>

      <div class="flex justify-end pt-5">
        <button
          @click="fields.items.push({ name: '', cost: 0 })"
          class="text-white mb-5 mr-5 dark:bg-gray-700 border-2 bg-gray-400 dark:hover:bg-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700"
        >
          +
        </button>
        <form method="dialog">
          <button
            @click="saveCatalogues"
            class="text-white mb-5 dark:bg-blue-700 border-2 bg-gray-400 dark:hover:bg-blue-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
