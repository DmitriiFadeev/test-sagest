export interface ISagestApiResponse {
    httpCode?: number;
    message?: string;
    errorCode?: string;
    data: ISagestItem[];
}

export interface ISagestItem {
    type: string;
    alias: string;
    name: string;
    avatar: string;
}