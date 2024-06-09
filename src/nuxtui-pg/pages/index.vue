<template>
  <div class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <h1>Welcome {{ currentUser && currentUser?.name || currentUser?.email }}</h1>
      <div class="float-right">
        <button type="button" @click="doLogout"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Logout</button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import PocketBase from 'pocketbase';

let pb = null;
const currentUser = ref();

const runtimeConfig = useRuntimeConfig();

onMounted(async () => {
  pb = new PocketBase(runtimeConfig.public.pbApi);

  pb.authStore.onChange(() => {
    currentUser.value = pb.authStore.isValid ? pb.authStore.model : null;
    // user logged out
    if (currentUser.value === null) {
      navigateTo("/user/login");
    }
  }, true)

});

const doLogout = () => {
  pb.authStore.clear();
  currentUser.value = null;
}

</script>

<style scoped>
</style>
