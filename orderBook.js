/* eslint-disable indent */
function reconcileOrder(existingBook, incomingOrder) {

    var updatedBook = []


    if (existingBook.length == 0) {

        updatedBook.push(incomingOrder)
        return updatedBook
    }
    else if (existingBook[0]['type'] == 'sell' && incomingOrder['type'] == 'sell') {


        updatedBook.push(existingBook[0], incomingOrder)

    }
    else if (existingBook[0]['type'] == 'buy' && incomingOrder['type'] == 'sell') {
        if (existingBook[0]['quantity'] == incomingOrder['quantity'] && existingBook[0]['price'] == incomingOrder['price']) {

            return updatedBook

        }
        else if (existingBook[0]['quantity'] != incomingOrder['quantity'] && existingBook[0]['price'] != incomingOrder['price']) {

            updatedBook.push(existingBook[0], incomingOrder)

        }
        else if (existingBook[0]['quantity'] == incomingOrder['quantity'] && existingBook[0]['price'] != incomingOrder['price']) {
            if (existingBook[0]['price'] < incomingOrder['price']) {

                updatedBook.push(existingBook[0], incomingOrder)

            }
            else if (existingBook[0]['price'] > incomingOrder['price']) {

                return updatedBook
            }

        }
        else if (existingBook[0]['quantity'] > incomingOrder['quantity'] && existingBook[0]['price'] == incomingOrder['price']) {

            updatedBook.push(existingBook[0])
            updatedBook[0]['quantity'] = existingBook[0]['quantity'] - incomingOrder['quantity']

        }
        else if (existingBook[0]['quantity'] < incomingOrder['quantity'] && existingBook[0]['price'] == incomingOrder['price']) {

            updatedBook.push(incomingOrder)
            updatedBook[0]['quantity'] = incomingOrder['quantity'] - existingBook[0]['quantity']

        }
    }

    return updatedBook

}

module.exports = reconcileOrder