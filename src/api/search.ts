import { get } from './config'


export const getSearch = (query: string) =>
    get('/search?q=' + query)