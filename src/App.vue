<script setup lang="ts">
import {onMounted} from "vue";
import Sagest from "./components/sagest/Sagest.vue";
import {data, selectedItems, onChange, onSearch, getData} from './services/main.ts'

onMounted(async () => {
  await getData()
})

</script>

<template>
  <Sagest
      title="Пользователь или компания"
      :value="selectedItems"
      :options="data"
      searchable
      placeholder="Выберете или введите"
      @on-change="onChange($event)"
      @search="onSearch($event)"
  />
</template>
