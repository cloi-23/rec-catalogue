<template>
  <div>
    <div
      class="max-w-3xl px-4 py-10 m-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700 sm:rounded-lg"
    >
      <main
        class="max-w-none prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 text-gray-600 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primary-400"
      >
        <div class="flex w-full justify-between">
          <input
            type="text"
            placeholder="Search Item"
            class="p-4 border-2 border-gray-300 form-input mt-1 block w-1/2 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            class="btn btn-sm btn-outline border-2 px-2 my-2 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 focus:ring-opacity-50"
          >
            ADD +
          </button>
        </div>
        <div class="py-7 grid grid-cols-3 gap-4">
          <div class="grid-header">Date</div>
          <div class="grid-header">Cost</div>
          <div class="grid-header">Supplier</div>
        </div>
        <div class="grid grid-cols-3 gap-4 dark:text-gray-300">
          <div class="grid-cell">Nov, 20, 2020</div>
          <div class="grid-cell">P103</div>
          <div class="grid-cell">McDonalds</div>
        </div>
        <div class="grid grid-cols-3 gap-4 dark:text-gray-300">
          <div class="grid-cell">Nov, 20, 2020</div>
          <div class="grid-cell">P103</div>
          <div class="grid-cell">McDonalds</div>
        </div>
        <div class="grid grid-cols-3 gap-4 dark:text-gray-300">
          <div class="grid-cell">Nov, 20, 2020</div>
          <div class="grid-cell">P103</div>
          <div class="grid-cell">McDonalds</div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.grid-header {
  font-weight: bold;
  padding: 10px;
  background: #f0f0f0;
  border: 1px solid #drgb(209, 209, 209);
}

.grid-cell {
  padding: 10px;
}
</style>
