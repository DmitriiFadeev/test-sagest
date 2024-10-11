import {ref, PropType, watch, onMounted, defineProps, defineEmits} from 'vue'
import { onClickOutside, useDebounceFn } from '@vueuse/core';


import {ISagestItem} from "../../common/types/SagestApi.ts";


const props = defineProps({
    title: { type: String, default: '' },
    placeholder: { type: String, default: 'Поиск' },
    label: { type: String, default: 'name' },
    multiple: { type: Boolean, default: false},
    options: { type: Array as PropType<ISagestItem[]> | null, default: () => [] },
    value: {
        type: Array as PropType<ISagestItem[]>,
        default: () => []
    },
    searchable: {type: Boolean, default: false},
});

const emits = defineEmits(['onChange', 'search', 'onSelectAll']);


const tags = ref<ISagestItem[]>([]);
const search = ref('');
const isShowList = ref(false)
const list = ref(null)
const inputSearch = ref<HTMLInputElement| null>(null)

const onSelect = (option: ISagestItem) => {
    emits('onChange', {option: option, multiple: false});
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
    if (search.value.length > 3) {
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