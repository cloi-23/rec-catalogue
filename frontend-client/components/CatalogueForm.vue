<template>
  <button
    class="block text-white dark:bg-blue-700 border-2 bg-gray-400 dark:hover:bg-blue-800 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onclick="my_modal_1.showModal()"
  >
    ADD +
  </button>
  <dialog id="my_modal_1" class="modal bg-gray-800 border rounded-md">
    <div class="w-full max-w-5xl p-10">
      <h3 class="">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p>
      <div class="text-right">
        <form method="dialog">
          <button class="btn">Save</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
