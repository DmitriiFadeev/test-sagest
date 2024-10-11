<script setup lang="ts">
import {computed} from "vue";
import {ISagestItem} from "../../common/types/SagestApi.ts";
import plug from '../../public/images/plug.webp'
import '../../assets/styles/UI/sagest/sagestItemUser.scss'

interface IProps {
  item: ISagestItem
}

const props = defineProps<IProps>()

const isName = computed(() => {
  return props.item.name ? props.item.name : props.item?.alias
})

const isAvatar = computed(() => {
  return props.item.avatar ? props.item.avatar : plug
})

const isAlias = computed(() => {
  return '@' + props.item?.alias
})
</script>

<template>
  <div class="sagest-item-user">
    <div class="sagest-item-user__avatar">
      <img :src="isAvatar" alt="avatar">
    </div>
    <div class="sagest-item-user__wrapper">
      <div class="sagest-item-user__name">
        {{ isName }}
      </div>
      <div class="sagest-item-user__alias">
        {{ isAlias }}
      </div>
    </div>
  </div>
</template>
