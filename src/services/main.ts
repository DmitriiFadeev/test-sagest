import {ref} from "vue";
import {ISagestApiResponse, ISagestItem} from "../common/types/SagestApi.ts";
import axios from "axios";

type ErrorResponse = {
    error: string;
};

export const data = ref<ISagestItem[]>([])
export const selectedItems = ref<ISagestItem[]>([])

export const onChange = ({option, multiple = false}: {option: ISagestItem, multiple: boolean}) => {
    const res = selectedItems.value.find(
        (s: ISagestItem) => s.alias === option.alias
    );

    if (Array.isArray(option)) {
        selectedItems.value = option;
        return;
    }

    if (res) {
        selectedItems.value = selectedItems.value.filter(
            (s: ISagestItem) => s.alias !== option.alias
        );
    } else {

        if (multiple) {
            selectedItems.value = [...selectedItems.value, option];
            return;
        }

        selectedItems.value = [option];
    }
};

export async function getData(search: string = '') {
    try {
        let url = `https://habr.com/kek/v2/publication/suggest-mention`
        if (search) url = url + `?q=${search}`

        const res = await axios.get<ISagestApiResponse>(url);
        data.value = res.data?.data
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            console.log((err.response?.data as ErrorResponse).error);
        }
    }
}

export const onSearch = async (event: string) => {
    await getData(event)
}

