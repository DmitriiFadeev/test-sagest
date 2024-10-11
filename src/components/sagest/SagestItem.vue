<script setup lang="ts">
import {computed} from "vue";

import SagestItemUser from "./SagestItemUser.vue";
import SagestItemCompany from "./SagestItemCompany.vue";
import {ISagestItem} from "../../common/types/SagestApi.ts";

interface IProps {
  type: string
  option: ISagestItem
}

const props = defineProps<IProps>()

const sagestType = {
  ['user']: SagestItemUser,
  ['company']: SagestItemCompany
}


const isSagestType = computed(() => {
  return sagestType[props.type]
})


</script>

<template>
  <component :is="isSagestType" :item="option"/>
</template>
