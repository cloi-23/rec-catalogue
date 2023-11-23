<script setup lang="ts">
const fields = ref({
  date: new Date().toISOString().split("T")[0],
  supplier: "",
  items: [{ name: "", cost: 0 }],
});
const emit = defineEmits(["refresh"]);
const formModal: any = ref(null);
const saveCatalogues = async () => {
  await $fetch("http://localhost:3000/catalogues", {
    method: "POST",
    body: fields.value,
  });
  emit("refresh");
};

const openForm = () => {
  fields.value.items = [{ name: "", cost: 0 }];
  fields.value.supplier = "";
  formModal.value.showModal();
};
</script>
<template>
  <button
    class="text-white dark:bg-blue-700 border-2 bg-gray-400 dark:hover:bg-blue-800 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    @click="openForm"
  >
    ADD +
  </button>
  <dialog
    ref="formModal"
    @keyup.shift.enter.native="fields.items.push({ name: '', cost: 0 })"
    @keyup.alt.enter.native="saveCatalogues"
    class="modal dark:bg-gray-800 border border-gray-300 rounded-md"
  >
    <div class="px-10">
      <div class="flex flex-row gap-5">
        <div class="grow">
          <h3>Supplier</h3>
        <input
          v-model="fields.supplier"
          type="text"
          placeholder="Supplier Name"
          class="h-12 border-2 px-4 border-gray-300 mt-1 block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <h3>Date</h3>
        <input
          v-model="fields.date"
          type="date"
          class=" h-12 border-2 px-3 border-gray-300 mt-1 block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        </div>
      </div>
      <h3 class="text-left">Add Items & Unit Cost</h3>
  
      <div v-for="(field, i) in fields.items" :key="i" class="flex gap-5 py-2">
        <input
          v-model="field.name"
          type="text"
          placeholder="Item Name"
          class="h-12  w-full p-4 border-2 border-gray-300 mt-1 block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <input
          v-model="field.cost"
          type="number"
          placeholder="Cost"
          class="h-12  w-28 p-4 border-2 border-gray-300 mt-1 block rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <button
          @click="fields.items.splice(i, 1)"
          tabindex="-1"
          class="h-12   text-white my-1 dark:bg-gray-700 border-2 bg-gray-400 dark:hover:bg-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700"
        >
          -
        </button>
      </div>
      <div class="pt-5">
        <div class="flex justify-end">
          <button
            @click="fields.items.push({ name: '', cost: 0 })"
            class=" text-white mb-5 mr-5 dark:bg-gray-700 border-2 bg-gray-400 dark:hover:bg-gray-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-blue-700"
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
            <button
              class="text-white mb-5 dark:bg-blue-700 border-2 bg-gray-400 dark:hover:bg-blue-800 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </dialog>
</template>
