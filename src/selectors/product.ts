import { State } from '../reducers'
import { isNil, sort } from 'ramda'
import { getWordWithNumberInRightCase } from '../utils'


export function selectCheapestAndRecommendedOffer(state: State) {
    const offers = state.product.similarProducts
    const currentPrice = state.product.price

    if (isNil(offers) || offers.length === 0 || isNil(currentPrice)) {
        return {}
    }

    const cheapests = sort(
        (first: { price: number }, second: { price: number }) => first.price - second.price,
        offers.filter(item => item.price < currentPrice)
    )

    if (cheapests.length === 0) {
        return {}
    }

    const cheapest : any = cheapests[0]

    cheapest.features = [ cheapest.trust ]
    if (cheapest.clientCount > 0) {
        cheapest.features.push(cheapest.clientCount + ' ' + getWordWithNumberInRightCase(cheapest.clientCount, [ 'клиент', 'клиента', 'клиентов' ]))
    }
    if (!isNil(cheapest.isProtectedDeal)) {
        cheapest.features.push(cheapest.isProtectedDeal ? 'Без риска' : 'Есть риск')
    }
    cheapest.name = cheapest.organizationName

    const recommendeds = sort(
        (first: { score: number }, second: { score: number }) => second.score - first.score,
        offers.filter(item => item.positionId !== cheapest.positionId)
    )

    if (recommendeds.length === 0) {
        return {}
    }

    const recommended : any = recommendeds[0]

    recommended.features = [ recommended.trust ]
    if (recommended.clientCount > 0) {
        recommended.features.push(recommended.clientCount + ' ' + getWordWithNumberInRightCase(recommended.clientCount, [ 'клиент', 'клиента', 'клиентов' ]))
    }
    if (!isNil(recommended.isProtectedDeal)) {
        recommended.features.push(recommended.isProtectedDeal ? 'Без риска' : 'Есть риск')
    }
    recommended.name = recommended.organizationName

    return { cheapest, recommended }
}