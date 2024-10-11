<script setup lang="ts">
import {ref, watch, onMounted} from 'vue'
import { onClickOutside, useDebounceFn } from '@vueuse/core';
import IconClose from "../icons/IconClose.vue";
import SagestItem from "./SagestItem.vue";
import {ISagestItem} from "../../common/types/SagestApi.ts";
import '../../assets/styles/UI/sagest/sagest.scss'

interface IProps {
  title?: string
  placeholder?: string
  label?: string
  multiple?: boolean
  options: ISagestItem[]
  value: ISagestItem[]
  searchable?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  placeholder: 'Поиск',
  label: 'name',
  options: () => [],
  value: () => [],
})

const emits = defineEmits(['onChange', 'search', 'onSelectAll']);

const minCountSearchCharacters = 3

const tags = ref<ISagestItem[]>([]);
const search = ref('');
const isShowList = ref(false)
const list = ref(null)
const inputSearch = ref<HTMLInputElement| null>(null)

const onSelect = (option: ISagestItem) => {
  emits('onChange', {option: option, multiple: props.multiple});
  if (search.value) {
    search.value = ''
    emits('search', search.value)
    setTimeout(() => {
      inputSearch.value?.focus()
    }, 100)
  }
};

const removeTag = (option: ISagestItem) => {
  emits('onChange', {option: option});
};

const onSearch = useDebounceFn(() => {
  if (search.value.length > minCountSearchCharacters) {
    emits('search', search.value)
  }
}, 500)

const showList = () => {
  isShowList.value = true

  if (isShowList.value && search.value) {
    search.value = ''
    emits('search', '');
  }

  setTimeout(() => {
    inputSearch.value?.focus()
  }, 100)
}

watch(
    () => props.value,
    async () => {
      tags.value = props.value;
    },
    { deep: true }
);

onMounted(() => {
  tags.value = props.value;
});

onClickOutside(list, () => (isShowList.value = false));
</script>

<template>
  <div class="sagest">
    <div class="sagest__wrapper">
      <div class="sagest__head">
        <div class="sagest__label">{{ title }}</div>
      </div>
      <div class="sagest__inner" :class="{'sagest--open': isShowList }" @click="showList">
        <div ref="list">
          <div class="sagest__tags">
            <div v-if="!tags.length && !isShowList" class="sagest__placeholder">{{ placeholder }}</div>
            <div
                v-for="(tag) in tags"
                :key="tag?.alias"
                class="sagest__tag"
            >
              <span>{{ '@' +  tag?.alias }}</span>
              <div class="sagest__close">
                <IconClose width="8" height="8" fill="#266d58" @click.stop="removeTag(tag)" />
              </div>
            </div>
            <div v-show="isShowList && searchable" class="sagest__search" >
              <input
                  ref="inputSearch"
                  type="text"
                  :placeholder="placeholder"
                  v-model="search"
                  @input="onSearch"
              />
            </div>
          </div>
          <div v-if="isShowList">
            <ul v-if="options.length" class="sagest__list">
              <li
                  v-for="option in options"
                  :key="option?.alias"
                  class="sagest__item"
                  :class="{
							'sagest__item--selected': !!tags.find(
								t => t.alias === option?.alias
							)
						}"
                  @click.stop="onSelect(option)"
              >
                <SagestItem :type="option.type" :option="option"/>
              </li>
            </ul>
            <ul v-if="!options.length && !search" class="sagest__list">
              <li class="sagest__item no-click">Данных нет</li>
            </ul>
            <ul v-if="search && !options.length" class="sagest__list">
              <li class="sagest__item no-click">
                Элементы не найдены. Рассмотрите возможность изменения поискового
                запроса.
              </li>
            </ul>
          </div>
          <div class="sagest__actions-arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>