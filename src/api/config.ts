import axios from 'axios'

const CONTEXT = 'http://localhost:8080'

export const post = <T>(url: string, values? : any, config? : any) : Promise<T> => axios.post(CONTEXT + url, values, config)
export const get = <T>(url: string) : Promise<T>  => axios.get(CONTEXT + url)