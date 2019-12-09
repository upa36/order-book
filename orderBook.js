/* eslint-disable indent */
function matchingOrder(existingBook, incomingOrder) {
    let matchingOrder = existingBook.filter((item) => {
        return item.type !== incomingOrder.type &&
            item.price === incomingOrder.price
    })
    return matchingOrder
}

function updatesMatchingOrder(existingBook, incomingOrder) {
    let updatedBook = []
    const matchingIndex = existingBook.findIndex((item) => {
        return incomingOrder.type !== item.type &&
            incomingOrder.quantity === item.quantity &&
            incomingOrder.price === item.price
    })
    const partialMatchingIndex = existingBook.findIndex((item) => {
        return incomingOrder.type !== item.type &&
            incomingOrder.price === item.price
    })

    if (matchingIndex > -1) {
        updatedBook = removesMatchingOrder(matchingIndex, existingBook)
    } else {
        updatedBook = existingBook
        let existingOrder = updatedBook[partialMatchingIndex]
        if (existingOrder.quantity > incomingOrder.quantity) {
            updatedBook[partialMatchingIndex].quantity = existingOrder.quantity - incomingOrder.quantity
        } else {
            updatedBook[partialMatchingIndex].quantity = incomingOrder.quantity - existingOrder.quantity
            updatedBook[partialMatchingIndex].type = incomingOrder.type
        }
    }
    return updatedBook
}

function removesMatchingOrder(matchingIndex, existingBook) {
    let updatedBook = existingBook
    updatedBook.splice(matchingIndex, 1)
    return updatedBook
}

function getUpdatedBook(existingBook, incomingOrder) {
    let updatedBook = []
    let matchingOrders = matchingOrder(existingBook, incomingOrder)
    if (matchingOrders.length) {
        updatedBook = updatesMatchingOrder(existingBook, incomingOrder)
    } else {
        updatedBook = existingBook.concat(incomingOrder)
    }
    return updatedBook
}

function reconcileOrder(existingBook, incomingOrder) {
    let updatedBook = []
    if (!existingBook.length) {
        updatedBook = existingBook.concat(incomingOrder)
    } else {
        updatedBook = getUpdatedBook(existingBook, incomingOrder)
    }
    return updatedBook
}

module.exports = reconcileOrder