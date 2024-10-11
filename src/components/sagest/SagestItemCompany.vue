<script setup lang="ts">
import {computed} from "vue";
import {ISagestItem} from "../../common/types/SagestApi.ts";
import '../../assets/styles/UI/sagest/sagestItemCompany.scss'
import plug from '../../public/images/plug.webp'

interface IProps {
  item: ISagestItem
}

const props = defineProps<IProps>()

const isAvatar = computed(() => {
  return props.item.avatar ? props.item.avatar : plug
})

const isName = computed(() => {
  return props.item.name ? props.item.name : props.item?.alias
})

</script>

<template>
  <div class="sagest-item-company">
    <div class="sagest-item-company__avatar">
      <img :src="isAvatar" alt="avatar">
    </div>
    <div class="sagest-item-company__wrapper">
      <div class="sagest-item-company__name">
        {{ isName }}
      </div>
      <div class="sagest-item-company__type">
        Компания
      </div>
    </div>
  </div>
</template>
