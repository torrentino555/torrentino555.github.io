import { isNil } from 'ramda'


export interface ResponseData {
    actionCode: number | null
    body: any
    responseStatus: string
    statusDescription: string[]
}

export const assertResponse = (response: any) => {
    if (isNil(response))
        throw new Error('Неизвестная ошибка сети.')

    return response
}