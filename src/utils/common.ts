import {ICompany} from '../selectors/search'
import {OrganizationType} from '../dto/Product'

export const empty = () => {}

// forms: [ 'вопрос', 'вопроса', 'вопросов' ]
export function getWordWithNumberInRightCase(count: number, forms: [ string, string, string ]): string {
    const number = Math.abs(count) % 100
    const digit = number % 10

    if (number >= 5 && number <= 20) {
        return forms[ 2 ]
    }

    if (digit === 1) {
        return forms[ 0 ]
    }

    if (digit >= 2 && digit <= 4) {
        return forms[ 1 ]
    }

    return forms[ 2 ]
}

export function numberWithSpaces(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function filterByType(companies: ICompany[], type: OrganizationType) {
    return companies.filter((company) => company.organizationType === type)
}